import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const firstName = user.user_metadata?.first_name || '';
  const lastName = user.user_metadata?.last_name || '';
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || user.email || 'User';
  const initials = firstName ? `${firstName[0]}${lastName ? lastName[0] : ''}` : (user.email ? user.email[0].toUpperCase() : 'U');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      <Sidebar userInitials={initials} userFullName={fullName} userEmail={user.email || ''} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 border-b border-slate-800 bg-slate-900/20 backdrop-blur-md">
          <h2 className="text-lg font-semibold">Overview</h2>
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-slate-50 transition-colors relative outline-none flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
              <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white font-bold">3</span>
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
