'use client';

import { Star, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BookModal({ isOpen, onClose, onSave, initialData = null }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('Want to Read');
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setAuthor(initialData.author || '');
      setTags(initialData.tags ? initialData.tags.join(', ') : '');
      setStatus(initialData.status || 'Want to Read');
      setRating(initialData.rating || 0);
      setNotes(initialData.notes || '');
    } else {
      setTitle('');
      setAuthor('');
      setTags('');
      setStatus('Want to Read');
      setRating(0);
      setNotes('');
    }
    setError('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      setError('Title and Author are required.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await onSave({
        title: title.trim(),
        author: author.trim(),
        tags: tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        status,
        rating,
        notes: notes.trim(),
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save book');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">
            {initialData ? 'Edit Book Entry' : 'Add New Book'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-xl bg-rose-50 p-3 text-xs font-medium text-rose-700 border border-rose-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Book Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Atomic Habits"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Author Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. James Clear"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Status & Tags Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Reading Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="Want to Read">📖 Want to Read</option>
                <option value="Reading">📘 Reading</option>
                <option value="Completed">✅ Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tags <span className="text-slate-400 font-normal">(comma-separated)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Self-Help, Productivity"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Rating
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  onClick={() => setRating(rating === star ? 0 : star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`h-5 w-5 ${
                      star <= rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300 hover:text-amber-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-semibold text-slate-500">
                {rating > 0 ? `${rating}/5 Stars` : 'Unrated'}
              </span>
            </div>
          </div>

          {/* Notes / Reflection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Personal Reflection / Notes
            </label>
            <textarea
              rows={3}
              placeholder="What are your key takeaways or why do you want to read this?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 disabled:opacity-50"
            >
              {submitting ? 'Saving...' : initialData ? 'Update Book' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
