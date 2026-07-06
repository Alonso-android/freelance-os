'use client'

import { useActionState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { addInvoice } from './actions'

const initialState = {
  error: null as string | null,
  success: false,
}

type Project = {
  id: string;
  name: string;
}

export function InvoiceForm({ projects }: { projects: Project[] }) {
  const [state, formAction, isPending] = useActionState(addInvoice, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state.success])

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle>Create New Invoice</CardTitle>
        <CardDescription className="text-slate-400">
          Draft a new invoice and attach it to a project.
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
              Invoice created successfully!
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="project_id" className="text-slate-300">Project</Label>
            <Select name="project_id" required>
              <SelectTrigger className="bg-slate-950 border-slate-800 text-slate-50 focus-visible:ring-indigo-500">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-800 text-slate-50">
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id} className="focus:bg-slate-800 focus:text-slate-50">
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-slate-300">Amount ($)</Label>
            <Input id="amount" name="amount" type="number" min="0" step="0.01" required placeholder="1500.00" className="bg-slate-950 border-slate-800 text-slate-50 focus-visible:ring-indigo-500" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-slate-300">Status</Label>
              <Select name="status" defaultValue="Pending">
                <SelectTrigger className="bg-slate-950 border-slate-800 text-slate-50 focus-visible:ring-indigo-500">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-50">
                  <SelectItem value="Pending" className="focus:bg-slate-800 focus:text-slate-50">Pending</SelectItem>
                  <SelectItem value="Paid" className="focus:bg-slate-800 focus:text-slate-50">Paid</SelectItem>
                  <SelectItem value="Overdue" className="focus:bg-slate-800 focus:text-slate-50">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="due_date" className="text-slate-300">Due Date</Label>
              <Input id="due_date" name="due_date" type="date" required className="bg-slate-950 border-slate-800 text-slate-50 focus-visible:ring-indigo-500 [color-scheme:dark]" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending} className="bg-indigo-600 hover:bg-indigo-500 text-white">
            {isPending ? 'Creating Invoice...' : 'Create Invoice'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
