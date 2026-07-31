'use client';

import { Plus, Search, Tag, X } from 'lucide-react';

export default function FilterBar({
  selectedStatus,
  onStatusChange,
  selectedTag,
  onTagChange,
  searchQuery,
  onSearchChange,
  availableTags = [],
  onOpenAddModal,
}) {
  const statusOptions = [
    { label: 'All', value: 'All' },
    { label: '📖 Want to Read', value: 'Want to Read' },
    { label: '📘 Reading', value: 'Reading' },
    { label: '✅ Completed', value: 'Completed' },
  ];

  return (
    <div className="mb-6 space-y-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Status Tabs */}
        <div className="flex flex-wrap gap-1.5 rounded-xl bg-slate-100 p-1">
          {statusOptions.map((opt) => {
            const isActive = selectedStatus === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onStatusChange(opt.value)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Add Book Action */}
        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 active:scale-95 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Book</span>
        </button>
      </div>

      {/* Search & Tag Filter Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-8 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Tag Filter Dropdown */}
        {availableTags.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="relative inline-block text-left w-full sm:w-auto">
              <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-medium text-slate-700">
                <Tag className="h-3.5 w-3.5 text-slate-400" />
                <span>Tag:</span>
                <select
                  value={selectedTag}
                  onChange={(e) => onTagChange(e.target.value)}
                  className="bg-transparent font-semibold text-indigo-600 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Tags</option>
                  {availableTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedTag !== 'All' && (
              <button
                onClick={() => onTagChange('All')}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                title="Clear Tag Filter"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
