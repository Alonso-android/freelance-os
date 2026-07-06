import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { InvoiceForm } from './InvoiceForm'

export default async function InvoicesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch projects for the form and for joining with invoices
  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('id, name')
    .eq('user_id', user.id)
    .order('name', { ascending: true })

  // Fetch invoices
  const { data: invoices, error: invoicesError } = await supabase
    .from('invoices')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // Create a map of project ID to project name for easy lookup
  const projectMap = new Map(projects?.map(p => [p.id, p.name]) || [])

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  // Format Date
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateString))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      case 'Paid': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      case 'Overdue': return 'bg-rose-500/10 text-rose-400 border-rose-500/20'
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20'
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Invoices</h1>
        <p className="text-slate-400">Manage your billing, track payments, and follow up on overdue invoices.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-1">
          <InvoiceForm projects={projects || []} />
        </div>

        {/* Right Column: Table */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden shadow-xl">
            {invoices && invoices.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-400 bg-slate-900/80 uppercase border-b border-slate-800">
                    <tr>
                      <th scope="col" className="px-6 py-4 font-medium">Project</th>
                      <th scope="col" className="px-6 py-4 font-medium">Amount</th>
                      <th scope="col" className="px-6 py-4 font-medium">Status</th>
                      <th scope="col" className="px-6 py-4 font-medium">Due Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="bg-slate-900/20 hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-50">
                          {projectMap.get(invoice.project_id) || 'Unknown Project'}
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-300">
                          {formatCurrency(invoice.amount || 0)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                            {invoice.status || 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400">
                          {invoice.due_date ? formatDate(invoice.due_date) : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <h3 className="text-lg font-medium text-slate-200 mb-1">No invoices yet</h3>
                <p className="text-sm text-slate-400 max-w-sm">
                  You haven't generated any invoices. Use the form to bill your clients for projects.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
