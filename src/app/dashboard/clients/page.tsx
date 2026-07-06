import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ClientForm } from './ClientForm'

export default async function ClientsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: clients, error } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Clients</h1>
        <p className="text-slate-400">Manage your client relationships and contact information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-1">
          <ClientForm />
        </div>

        {/* Right Column: Table */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden shadow-xl">
            {/* Custom Tailwind Table */}
            {clients && clients.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-400 bg-slate-900/80 uppercase border-b border-slate-800">
                    <tr>
                      <th scope="col" className="px-6 py-4 font-medium">Name</th>
                      <th scope="col" className="px-6 py-4 font-medium">Email</th>
                      <th scope="col" className="px-6 py-4 font-medium">Company</th>
                      <th scope="col" className="px-6 py-4 font-medium">Added</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {clients.map((client) => (
                      <tr key={client.id} className="bg-slate-900/20 hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-50 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/20">
                            {client.name.charAt(0).toUpperCase()}
                          </div>
                          {client.name}
                        </td>
                        <td className="px-6 py-4 text-slate-400">{client.email}</td>
                        <td className="px-6 py-4 text-slate-400">
                          {client.company ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                              {client.company}
                            </span>
                          ) : (
                            <span className="text-slate-600">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-slate-500 text-xs">
                          {new Date(client.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h3 className="text-lg font-medium text-slate-200 mb-1">No clients yet</h3>
                <p className="text-sm text-slate-400 max-w-sm">
                  You haven't added any clients. Use the form to add your first client to the database.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
