import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Book from '@/lib/models/Book';
import { getAuthUser } from '@/lib/auth';

export async function GET(request) {
  try {
    const authData = getAuthUser(request);
    if (!authData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');

    // Build filter query for user's books
    const filter = { userId: authData.userId };

    if (status && status !== 'All') {
      filter.status = status;
    }

    if (tag && tag !== 'All') {
      filter.tags = tag;
    }

    if (search) {
      const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.$or = [
        { title: { $regex: safeSearch, $options: 'i' } },
        { author: { $regex: safeSearch, $options: 'i' } },
      ];
    }

    const books = await Book.find(filter).sort({ updatedAt: -1 });

    // Calculate collection stats
    const allUserBooks = await Book.find({ userId: authData.userId });
    const stats = {
      total: allUserBooks.length,
      wantToRead: allUserBooks.filter((b) => b.status === 'Want to Read').length,
      reading: allUserBooks.filter((b) => b.status === 'Reading').length,
      completed: allUserBooks.filter((b) => b.status === 'Completed').length,
    };

    // Extract unique tags across user collection
    const allTags = Array.from(
      new Set(allUserBooks.flatMap((b) => b.tags || []))
    ).sort();

    return NextResponse.json({
      books,
      stats,
      availableTags: allTags,
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch books' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const authData = getAuthUser(request);
    if (!authData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const { title, author, tags, status, rating, notes } = body;

    if (!title || !author) {
      return NextResponse.json(
        { error: 'Title and Author are required fields' },
        { status: 400 }
      );
    }

    // Clean up tags array
    let processedTags = [];
    if (Array.isArray(tags)) {
      processedTags = tags.map((t) => t.trim()).filter(Boolean);
    } else if (typeof tags === 'string') {
      processedTags = tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    }

    const validStatus = ['Want to Read', 'Reading', 'Completed'].includes(status)
      ? status
      : 'Want to Read';

    const newBook = await Book.create({
      userId: authData.userId,
      title: title.trim(),
      author: author.trim(),
      tags: processedTags,
      status: validStatus,
      rating: rating ? Number(rating) : 0,
      notes: notes ? notes.trim() : '',
    });

    return NextResponse.json(
      { message: 'Book added successfully', book: newBook },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add book' },
      { status: 500 }
    );
  }
}
