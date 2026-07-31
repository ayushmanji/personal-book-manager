'use client';

import { useAuth } from '@/context/AuthContext';
import { BookOpen, Sparkles, ArrowRight, ShieldCheck, Tag, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Header */}
      <header className="w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Personal Book Manager
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 text-center flex-1 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/80 px-3.5 py-1.5 text-xs font-semibold text-indigo-600 mx-auto mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          <span>A Personal Space for Readers</span>
        </div>

        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl max-w-3xl mx-auto leading-tight">
          Log your books. Reflect on habits. Rediscover reading.
        </h1>

        <p className="mt-6 text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Intuitive, elegant, and quietly powerful. Keep track of what you want to read, what you are currently reading, and your completed masterpieces.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 transition-all hover:scale-105"
          >
            <span>Create Your Free Haven</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all"
          >
            Sign In to Existing Account
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Secure JWT Authentication</h3>
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
              Your reading list and reflections stay private to you with encrypted passwords and token authentication.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 mb-4">
              <Tag className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Tags & Reading Statuses</h3>
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
              Organize by 📖 Want to Read, 📘 Reading, or ✅ Completed. Filter effortlessly by custom tags.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-4">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Gentle Insights</h3>
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
              Clarity over noise. Beautiful collection statistics and completion rate bars to keep you motivated.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        Personal Book Manager &bull; Built with Next.js, MongoDB & Tailwind CSS
      </footer>
    </div>
  );
}
