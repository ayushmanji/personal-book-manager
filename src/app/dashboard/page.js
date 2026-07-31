'use client';

import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import StatsCard from '@/components/StatsCard';
import FilterBar from '@/components/FilterBar';
import BookCard from '@/components/BookCard';
import BookModal from '@/components/BookModal';
import { BookOpen, Plus, Sparkles, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();

  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState({ total: 0, wantToRead: 0, reading: 0, completed: 0 });
  const [availableTags, setAvailableTags] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);

  // Filters
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const fetchBooks = useCallback(async () => {
    if (!token) return;
    setLoadingBooks(true);
    try {
      const queryParams = new URLSearchParams();
      if (selectedStatus !== 'All') queryParams.append('status', selectedStatus);
      if (selectedTag !== 'All') queryParams.append('tag', selectedTag);
      if (searchQuery.trim()) queryParams.append('search', searchQuery.trim());

      const res = await fetch(`/api/books?${queryParams.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setBooks(data.books || []);
        setStats(data.stats || { total: 0, wantToRead: 0, reading: 0, completed: 0 });
        setAvailableTags(data.availableTags || []);
      }
    } catch (err) {
      console.error('Failed to load books:', err);
    } finally {
      setLoadingBooks(false);
    }
  }, [token, selectedStatus, selectedTag, searchQuery]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (token) {
      fetchBooks();
    }
  }, [token, fetchBooks]);

  const handleSaveBook = async (bookData) => {
    const url = editingBook ? `/api/books/${editingBook._id}` : '/api/books';
    const method = editingBook ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookData),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to save book');
    }

    showToast(editingBook ? 'Book details updated' : 'New book added to collection!');
    fetchBooks();
  };

  const handleStatusUpdate = async (bookId, newStatus) => {
    try {
      const res = await fetch(`/api/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        showToast(`Status updated to "${newStatus}"`);
        fetchBooks();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (!confirm('Are you sure you want to remove this book from your collection?')) return;

    try {
      const res = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        showToast('Book removed from collection');
        fetchBooks();
      }
    } catch (err) {
      console.error('Failed to delete book:', err);
    }
  };

  const handleAddSampleBooks = async () => {
    const samples = [
      {
        title: 'Atomic Habits',
        author: 'James Clear',
        tags: ['Productivity', 'Self-Help'],
        status: 'Reading',
        rating: 5,
        notes: 'An easy & proven way to build good habits & break bad ones.',
      },
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        tags: ['Classics', 'Fiction'],
        status: 'Completed',
        rating: 4,
        notes: 'A masterpiece on the American dream.',
      },
      {
        title: 'Deep Work',
        author: 'Cal Newport',
        tags: ['Productivity', 'Focus'],
        status: 'Want to Read',
        rating: 0,
        notes: 'Rules for focused success in a distracted world.',
      },
    ];

    for (const book of samples) {
      await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(book),
      });
    }

    showToast('Sample books added to your collection!');
    fetchBooks();
  };

  if (authLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      <Navbar />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-slate-900 px-4 py-3 text-xs font-semibold text-white shadow-2xl animate-fade-in flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        {/* Welcome Banner */}
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Welcome, {user.name} 👋
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Your personal space to log, organize, and reflect on your reading journey.
            </p>
          </div>
        </div>

        {/* Dashboard Insight Statistics */}
        <StatsCard stats={stats} />

        {/* Filters and Search Bar */}
        <FilterBar
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          availableTags={availableTags}
          onOpenAddModal={() => {
            setEditingBook(null);
            setModalOpen(true);
          }}
        />

        {/* Book Collection List / Grid */}
        {loadingBooks ? (
          <div className="py-20 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
            <p className="mt-3 text-xs font-medium text-slate-500">Loading your collection...</p>
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onEdit={(b) => {
                  setEditingBook(b);
                  setModalOpen(true);
                }}
                onDelete={handleDeleteBook}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4">
              <BookOpen className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {stats.total === 0 ? 'Your reading space is empty' : 'No matching books found'}
            </h3>
            <p className="mt-1.5 text-xs text-slate-500 max-w-sm mx-auto">
              {stats.total === 0
                ? 'Start building your personal collection by adding books or loading sample titles.'
                : 'Try adjusting your search query or filters to find what you are looking for.'}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setEditingBook(null);
                  setModalOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 transition-all"
              >
                <Plus className="h-4 w-4" />
                <span>Add Your First Book</span>
              </button>

              {stats.total === 0 && (
                <button
                  onClick={handleAddSampleBooks}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-all"
                >
                  <Sparkles className="h-4 w-4 text-indigo-500" />
                  <span>Load Sample Books</span>
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Add / Edit Modal */}
      <BookModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingBook(null);
        }}
        onSave={handleSaveBook}
        initialData={editingBook}
      />
    </div>
  );
}
