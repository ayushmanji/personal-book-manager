'use client';

import { BookMarked, BookOpenCheck, Bookmark, CheckCircle2 } from 'lucide-react';

export default function StatsCard({ stats = { total: 0, wantToRead: 0, reading: 0, completed: 0 } }) {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statItems = [
    {
      label: 'Total Collection',
      value: stats.total,
      icon: BookMarked,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
    {
      label: 'Want to Read',
      value: stats.wantToRead,
      icon: Bookmark,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      label: 'Currently Reading',
      value: stats.reading,
      icon: BookOpenCheck,
      color: 'text-sky-600 bg-sky-50 border-sky-100',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
  ];

  return (
    <div className="space-y-4 mb-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.label}
              className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
                    {item.value}
                  </p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${item.color}`}>
                  <IconComponent className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion progress bar */}
      {stats.total > 0 && (
        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
            <span>Reading Completion Progress</span>
            <span className="text-indigo-600 font-bold">{completionRate}% Completed</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden flex">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${(stats.completed / stats.total) * 100}%` }}
              title={`Completed: ${stats.completed}`}
            />
            <div
              className="h-full bg-sky-500 transition-all duration-500"
              style={{ width: `${(stats.reading / stats.total) * 100}%` }}
              title={`Reading: ${stats.reading}`}
            />
            <div
              className="h-full bg-amber-400 transition-all duration-500"
              style={{ width: `${(stats.wantToRead / stats.total) * 100}%` }}
              title={`Want to Read: ${stats.wantToRead}`}
            />
          </div>
          <div className="mt-2 flex items-center justify-end gap-4 text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" /> Completed ({stats.completed})
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-sky-500 inline-block" /> Reading ({stats.reading})
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-400 inline-block" /> Want to Read ({stats.wantToRead})
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
