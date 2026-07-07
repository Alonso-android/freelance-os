import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-sans selection:bg-indigo-500/30 scroll-smooth">
      <header className="container mx-auto px-6 py-8 flex items-center justify-between z-10 sticky top-0 bg-slate-950/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            F
          </div>
          <span className="text-xl font-bold tracking-tight">FreelanceOS</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
              Log in
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition-all">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center relative px-6 text-center z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-indigo-400 text-xs font-semibold mb-8 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            FreelanceOS Beta is now live
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-8 leading-tight">
            The Operating System for <br className="hidden md:block" /> Independent Professionals.
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
            Manage your clients, invoices, projects, and proposals all in one beautiful, frictionless workspace designed specifically for freelancers.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-500/25 h-14 px-8 text-lg w-full sm:w-auto transition-all scale-100 hover:scale-105">
                Start for free
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full sm:w-auto border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:text-white backdrop-blur-sm">
                View Demo
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 bg-slate-900/20 border-y border-slate-800/50">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to run your business</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">No more juggling between five different apps. FreelanceOS gives you all the tools to manage your clients and projects perfectly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-indigo-500/50 transition-colors">
                <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Client CRM</h3>
                <p className="text-slate-400 text-sm">Keep track of all your client details, contact information, and interaction history in one organized place.</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-indigo-500/50 transition-colors">
                <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Project Management</h3>
                <p className="text-slate-400 text-sm">Organize deliverables, set deadlines, and attach tasks to specific clients so you never miss a milestone.</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-indigo-500/50 transition-colors">
                <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Invoicing</h3>
                <p className="text-slate-400 text-sm">Generate beautiful invoices, track pending payments, and keep an eye on your total business revenue.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 px-6 relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="container mx-auto max-w-4xl relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Start for free, upgrade when you need more power.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl flex flex-col">
                <h3 className="text-xl font-bold mb-2">Starter</h3>
                <div className="text-4xl font-extrabold mb-6">$0<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center text-slate-300">
                    <svg className="w-5 h-5 text-emerald-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Up to 3 Clients
                  </li>
                  <li className="flex items-center text-slate-300">
                    <svg className="w-5 h-5 text-emerald-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Up to 5 Projects
                  </li>
                  <li className="flex items-center text-slate-300">
                    <svg className="w-5 h-5 text-emerald-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Basic Invoicing
                  </li>
                </ul>
                <Link href="/register" className="w-full">
                  <Button variant="outline" className="w-full border-slate-700 bg-transparent hover:bg-slate-800">Get Started Free</Button>
                </Link>
              </div>

              <div className="bg-gradient-to-b from-indigo-900/40 to-slate-900/40 border border-indigo-500/50 p-8 rounded-2xl flex flex-col relative shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Popular
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Premium</h3>
                <div className="text-4xl font-extrabold mb-6">$4.99<span className="text-lg text-indigo-300 font-normal">/mo</span></div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center text-slate-300">
                    <svg className="w-5 h-5 text-emerald-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Unlimited Clients
                  </li>
                  <li className="flex items-center text-slate-300">
                    <svg className="w-5 h-5 text-emerald-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Unlimited Projects
                  </li>
                  <li className="flex items-center text-slate-300">
                    <svg className="w-5 h-5 text-emerald-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Advanced Analytics & Reports
                  </li>
                  <li className="flex items-center text-slate-300">
                    <svg className="w-5 h-5 text-emerald-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Custom Invoice Branding
                  </li>
                </ul>
                <Link href="/register" className="w-full">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white">Upgrade to Premium</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 bg-slate-900/20 border-t border-slate-800/50 text-center">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Built for the Modern Independent</h2>
            <p className="text-slate-400 leading-relaxed text-lg mb-8">
              FreelanceOS was born out of a simple frustration: managing a freelance business shouldn't require five different subscriptions. We combined the core pillars of independent work—CRM, Projects, and Invoicing—into a single, blazing-fast, and beautiful interface. Your business deserves a modern operating system.
            </p>
            <Link href="/demo">
              <Button variant="link" className="text-indigo-400 hover:text-indigo-300">
                Experience the difference &rarr;
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-6 py-8 text-center text-slate-500 text-sm z-10 border-t border-slate-800/50">
        &copy; {new Date().getFullYear()} FreelanceOS. All rights reserved.
      </footer>
    </div>
  );
}
