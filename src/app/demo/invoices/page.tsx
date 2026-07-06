'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function DemoInvoicesPage() {
  const dummyInvoices = [
    { id: '1', project: 'Website Redesign', amount: 3500, status: 'Paid', due_date: '2026-05-10' },
    { id: '2', project: 'Mobile App MVP', amount: 12500, status: 'Pending', due_date: '2026-06-15' },
    { id: '3', project: 'Brand Identity', amount: 3200, status: 'Paid', due_date: '2026-04-01' },
    { id: '4', project: 'E-commerce Platform', amount: 6000, status: 'Pending', due_date: '2026-06-01' },
    { id: '5', project: 'SEO Optimization', amount: 1500, status: 'Overdue', due_date: '2026-05-01' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

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
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle>Create New Invoice</CardTitle>
              <CardDescription className="text-slate-400">
                Draft a new invoice and attach it to a project.
              </CardDescription>
            </CardHeader>
            <form onSubmit={(e) => e.preventDefault()}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project_id" className="text-slate-300">Project</Label>
                  <Select disabled>
                    <SelectTrigger className="bg-slate-950 border-slate-800 text-slate-50 opacity-50">
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="demo">Demo Project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-slate-300">Amount ($)</Label>
                  <Input id="amount" type="number" disabled placeholder="1500.00" className="bg-slate-950 border-slate-800 text-slate-50 opacity-50" />
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
                    <Label htmlFor="due_date" className="text-slate-300">Due Date</Label>
                    <Input id="due_date" type="date" disabled className="bg-slate-950 border-slate-800 text-slate-50 opacity-50 [color-scheme:dark]" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled className="bg-indigo-600/50 text-white/50 cursor-not-allowed">
                  Create Invoice (Demo)
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
                    <th scope="col" className="px-6 py-4 font-medium">Project</th>
                    <th scope="col" className="px-6 py-4 font-medium">Amount</th>
                    <th scope="col" className="px-6 py-4 font-medium">Status</th>
                    <th scope="col" className="px-6 py-4 font-medium">Due Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {dummyInvoices.map((invoice) => (
                    <tr key={invoice.id} className="bg-slate-900/20 hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-50">
                        {invoice.project}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-300">
                        {formatCurrency(invoice.amount)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {formatDate(invoice.due_date)}
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
