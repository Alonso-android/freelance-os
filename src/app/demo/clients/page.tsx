'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'

export default function DemoClientsPage() {
  const dummyClients = [
    { id: '1', name: 'Acme Corp', email: 'contact@acme.com', company: 'Acme Corporation', date: '2026-05-10' },
    { id: '2', name: 'GlobalTech', email: 'billing@globaltech.io', company: 'GlobalTech Solutions', date: '2026-04-22' },
    { id: '3', name: 'Sarah Jenkins', email: 'sarah.j@example.com', company: '', date: '2026-03-15' },
    { id: '4', name: 'Elevate Design', email: 'hello@elevatedesign.co', company: 'Elevate LLC', date: '2026-02-08' },
    { id: '5', name: 'Nexus Industries', email: 'vendor@nexus.com', company: 'Nexus Ind.', date: '2026-01-30' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Clients</h1>
        <p className="text-slate-400">Manage your client relationships and contact information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle>Add New Client</CardTitle>
              <CardDescription className="text-slate-400">
                Enter the details of your new client here.
              </CardDescription>
            </CardHeader>
            <form onSubmit={(e) => e.preventDefault()}>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-300">Name</Label>
                    <Input id="name" disabled placeholder="Jane Doe" className="bg-slate-950 border-slate-800 text-slate-50 opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300">Email</Label>
                    <Input id="email" type="email" disabled placeholder="jane@example.com" className="bg-slate-950 border-slate-800 text-slate-50 opacity-50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-slate-300">Company (Optional)</Label>
                  <Input id="company" disabled placeholder="Acme Corp" className="bg-slate-950 border-slate-800 text-slate-50 opacity-50" />
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled className="bg-indigo-600/50 text-white/50 cursor-not-allowed">
                  Add Client (Demo)
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
                    <th scope="col" className="px-6 py-4 font-medium">Name</th>
                    <th scope="col" className="px-6 py-4 font-medium">Email</th>
                    <th scope="col" className="px-6 py-4 font-medium">Company</th>
                    <th scope="col" className="px-6 py-4 font-medium">Added</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {dummyClients.map((client) => (
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
                        {new Date(client.date).toLocaleDateString()}
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
