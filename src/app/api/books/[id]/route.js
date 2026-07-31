import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Book from '@/lib/models/Book';
import { getAuthUser } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    const authData = getAuthUser(request);
    if (!authData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = params;

    const book = await Book.findOne({ _id: id, userId: authData.userId });
    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json({ book });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch book' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const authData = getAuthUser(request);
    if (!authData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = params;
    const body = await request.json();

    const book = await Book.findOne({ _id: id, userId: authData.userId });
    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    // Process fields if provided
    if (body.title !== undefined) book.title = body.title.trim();
    if (body.author !== undefined) book.author = body.author.trim();

    if (body.tags !== undefined) {
      if (Array.isArray(body.tags)) {
        book.tags = body.tags.map((t) => t.trim()).filter(Boolean);
      } else if (typeof body.tags === 'string') {
        book.tags = body.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);
      }
    }

    if (body.status !== undefined) {
      if (['Want to Read', 'Reading', 'Completed'].includes(body.status)) {
        book.status = body.status;
      }
    }

    if (body.rating !== undefined) book.rating = Number(body.rating);
    if (body.notes !== undefined) book.notes = body.notes.trim();

    await book.save();

    return NextResponse.json({ message: 'Book updated successfully', book });
  } catch (error) {
    console.error('Error updating book:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update book' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const authData = getAuthUser(request);
    if (!authData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = params;

    const deletedBook = await Book.findOneAndDelete({
      _id: id,
      userId: authData.userId,
    });

    if (!deletedBook) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    return NextResponse.json(
      { error: 'Failed to delete book' },
      { status: 500 }
    );
  }
}
