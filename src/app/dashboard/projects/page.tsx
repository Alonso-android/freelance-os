import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProjectForm } from './ProjectForm'

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch clients for the form and for joining with projects
  const { data: clients, error: clientsError } = await supabase
    .from('clients')
    .select('id, name')
    .eq('user_id', user.id)
    .order('name', { ascending: true })

  // Fetch projects
  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // Create a map of client ID to client name for easy lookup
  const clientMap = new Map(clients?.map(c => [c.id, c.name]) || [])

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'In Progress': return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      case 'Completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      case 'On Hold': return 'bg-rose-500/10 text-rose-400 border-rose-500/20'
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20'
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Projects</h1>
        <p className="text-slate-400">Manage your projects, budgets, and track progress.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-1">
          <ProjectForm clients={clients || []} />
        </div>

        {/* Right Column: Table */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden shadow-xl">
            {projects && projects.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-400 bg-slate-900/80 uppercase border-b border-slate-800">
                    <tr>
                      <th scope="col" className="px-6 py-4 font-medium">Project Name</th>
                      <th scope="col" className="px-6 py-4 font-medium">Client</th>
                      <th scope="col" className="px-6 py-4 font-medium">Status</th>
                      <th scope="col" className="px-6 py-4 font-medium">Budget</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {projects.map((project) => (
                      <tr key={project.id} className="bg-slate-900/20 hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-50">
                          {project.name}
                        </td>
                        <td className="px-6 py-4 text-slate-400 flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[10px] border border-slate-700">
                            {clientMap.get(project.client_id)?.charAt(0).toUpperCase() || '?'}
                          </div>
                          {clientMap.get(project.client_id) || 'Unknown Client'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                            {project.status || 'Planning'}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-300">
                          {formatCurrency(project.budget || 0)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                </div>
                <h3 className="text-lg font-medium text-slate-200 mb-1">No projects yet</h3>
                <p className="text-sm text-slate-400 max-w-sm">
                  You haven't created any projects. Use the form to start your first project and assign it to a client.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
