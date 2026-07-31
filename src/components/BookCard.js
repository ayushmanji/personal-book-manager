'use client';

import { Edit3, Star, Tag, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function BookCard({ book, onEdit, onDelete, onStatusUpdate }) {
  const [updating, setUpdating] = useState(false);

  const statusConfigs = {
    'Want to Read': {
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: '📖',
      label: 'Want to Read',
    },
    Reading: {
      badge: 'bg-sky-50 text-sky-700 border-sky-200',
      icon: '📘',
      label: 'Reading',
    },
    Completed: {
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: '✅',
      label: 'Completed',
    },
  };

  const currentConfig = statusConfigs[book.status] || statusConfigs['Want to Read'];

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    if (newStatus === book.status) return;

    setUpdating(true);
    try {
      await onStatusUpdate(book._id, newStatus);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div>
        {/* Status selector & Actions header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="relative inline-block">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${currentConfig.badge}`}
            >
              <span>{currentConfig.icon}</span>
              <select
                value={book.status}
                onChange={handleStatusChange}
                disabled={updating}
                className="bg-transparent font-semibold focus:outline-none cursor-pointer disabled:opacity-50"
              >
                <option value="Want to Read">Want to Read</option>
                <option value="Reading">Reading</option>
                <option value="Completed">Completed</option>
              </select>
            </span>
          </div>

          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(book)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              title="Edit Book"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(book._id)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
              title="Delete Book"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Book Title & Author */}
        <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
          {book.title}
        </h3>
        <p className="mt-1 text-xs font-medium text-slate-500">
          by <span className="font-semibold text-slate-700">{book.author}</span>
        </p>

        {/* Rating if present */}
        {book.rating > 0 && (
          <div className="mt-2.5 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3.5 w-3.5 ${
                  star <= book.rating
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-200'
                }`}
              />
            ))}
          </div>
        )}

        {/* Reflection / Notes if present */}
        {book.notes && (
          <p className="mt-3 text-xs italic text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 line-clamp-3">
            "{book.notes}"
          </p>
        )}
      </div>

      {/* Tags footer */}
      {book.tags && book.tags.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
          {book.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
            >
              <Tag className="h-3 w-3 text-slate-400" />
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
