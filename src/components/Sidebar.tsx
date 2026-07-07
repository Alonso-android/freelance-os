'use client'

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function Sidebar({ userInitials, userFullName, userEmail, className }: { userInitials: string, userFullName: string, userEmail: string, className?: string }) {
  const pathname = usePathname() || '';
  const router = useRouter();
  const isDemo = pathname.startsWith('/demo');
  const basePath = isDemo ? '/demo' : '/dashboard';
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <aside className={`w-64 border-r border-slate-800 bg-slate-900/50 flex flex-col ${className ?? 'hidden md:flex'}`}>
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            F
          </div>
          <span className="text-lg font-bold tracking-tight">FreelanceOS</span>
        </Link>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link href={basePath} className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-50 hover:bg-slate-800/50 rounded-md font-medium transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
          Dashboard
        </Link>
        <Link href={`${basePath}/clients`} className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-50 hover:bg-slate-800/50 rounded-md font-medium transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          Clients
        </Link>
        <Link href={`${basePath}/projects`} className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-50 hover:bg-slate-800/50 rounded-md font-medium transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
          Projects
        </Link>
        <Link href={`${basePath}/invoices`} className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-50 hover:bg-slate-800/50 rounded-md font-medium transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
          Invoices
        </Link>
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium">{userInitials}</div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{userFullName}</p>
            <p className="text-xs text-slate-500 truncate">{userEmail}</p>
          </div>
        </div>
        {!isDemo && (
          <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2 text-rose-400 hover:text-rose-300 hover:bg-rose-400/10 rounded-md font-medium transition-colors text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
            Sign out
          </button>
        )}
      </div>
    </aside>
  );
}
