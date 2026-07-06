'use client'

import { useActionState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { addProject } from './actions'

const initialState = {
  error: null as string | null,
  success: false,
}

type Client = {
  id: string;
  name: string;
}

export function ProjectForm({ clients }: { clients: Client[] }) {
  const [state, formAction, isPending] = useActionState(addProject, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state.success])

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
        <CardDescription className="text-slate-400">
          Set up a new project and assign it to a client.
        </CardDescription>
      </CardHeader>
      <form ref={formRef} action={formAction}>
        <CardContent className="space-y-4">
          {state?.error && (
            <div className="p-3 text-sm text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-md">
              {state.error}
            </div>
          )}
          {state?.success && (
            <div className="p-3 text-sm text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
              Project created successfully!
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">Project Name</Label>
            <Input id="name" name="name" required placeholder="Website Redesign" className="bg-slate-950 border-slate-800 text-slate-50 focus-visible:ring-indigo-500" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="client_id" className="text-slate-300">Client</Label>
            <Select name="client_id" required>
              <SelectTrigger className="bg-slate-950 border-slate-800 text-slate-50 focus-visible:ring-indigo-500">
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-800 text-slate-50">
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id} className="focus:bg-slate-800 focus:text-slate-50">
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-slate-300">Status</Label>
              <Select name="status" defaultValue="Planning">
                <SelectTrigger className="bg-slate-950 border-slate-800 text-slate-50 focus-visible:ring-indigo-500">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-50">
                  <SelectItem value="Planning" className="focus:bg-slate-800 focus:text-slate-50">Planning</SelectItem>
                  <SelectItem value="In Progress" className="focus:bg-slate-800 focus:text-slate-50">In Progress</SelectItem>
                  <SelectItem value="Completed" className="focus:bg-slate-800 focus:text-slate-50">Completed</SelectItem>
                  <SelectItem value="On Hold" className="focus:bg-slate-800 focus:text-slate-50">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-slate-300">Budget ($)</Label>
              <Input id="budget" name="budget" type="number" min="0" step="0.01" placeholder="5000" className="bg-slate-950 border-slate-800 text-slate-50 focus-visible:ring-indigo-500" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending} className="bg-indigo-600 hover:bg-indigo-500 text-white">
            {isPending ? 'Creating Project...' : 'Create Project'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
