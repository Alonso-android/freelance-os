'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function DemoProjectsPage() {
  const dummyProjects = [
    { id: '1', name: 'Website Redesign', client: 'Acme Corp', status: 'In Progress', budget: 12500 },
    { id: '2', name: 'Mobile App MVP', client: 'GlobalTech', status: 'Planning', budget: 45000 },
    { id: '3', name: 'Brand Identity', client: 'Sarah Jenkins', status: 'Completed', budget: 3200 },
    { id: '4', name: 'E-commerce Platform', client: 'Elevate Design', status: 'In Progress', budget: 28000 },
    { id: '5', name: 'SEO Optimization', client: 'Nexus Industries', status: 'On Hold', budget: 1500 },
  ];

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
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle>Create New Project</CardTitle>
              <CardDescription className="text-slate-400">
                Set up a new project and assign it to a client.
              </CardDescription>
            </CardHeader>
            <form onSubmit={(e) => e.preventDefault()}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-300">Project Name</Label>
                  <Input id="name" disabled placeholder="Website Redesign" className="bg-slate-950 border-slate-800 text-slate-50 opacity-50" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client_id" className="text-slate-300">Client</Label>
                  <Select disabled>
                    <SelectTrigger className="bg-slate-950 border-slate-800 text-slate-50 opacity-50">
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="demo">Demo Client</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-slate-300">Status</Label>
                    <Select disabled>
                      <SelectTrigger className="bg-slate-950 border-slate-800 text-slate-50 opacity-50">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="demo">Demo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-slate-300">Budget ($)</Label>
                    <Input id="budget" type="number" disabled placeholder="5000" className="bg-slate-950 border-slate-800 text-slate-50 opacity-50" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled className="bg-indigo-600/50 text-white/50 cursor-not-allowed">
                  Create Project (Demo)
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Right Column: Table */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden shadow-xl">
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
                  {dummyProjects.map((project) => (
                    <tr key={project.id} className="bg-slate-900/20 hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-50">
                        {project.name}
                      </td>
                      <td className="px-6 py-4 text-slate-400 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[10px] border border-slate-700">
                          {project.client.charAt(0).toUpperCase()}
                        </div>
                        {project.client}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-300">
                        {formatCurrency(project.budget)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
