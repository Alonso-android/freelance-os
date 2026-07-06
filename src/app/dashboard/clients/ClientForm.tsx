'use client'

import { useActionState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { addClient } from './actions'

const initialState = {
  error: null as string | null,
  success: false,
}

export function ClientForm() {
  const [state, formAction, isPending] = useActionState(addClient, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state.success])

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle>Add New Client</CardTitle>
        <CardDescription className="text-slate-400">
          Enter the details of your new client here.
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
              Client added successfully!
            </div>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">Name</Label>
              <Input id="name" name="name" required placeholder="Jane Doe" className="bg-slate-950 border-slate-800 text-slate-50 focus-visible:ring-indigo-500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="jane@example.com" className="bg-slate-950 border-slate-800 text-slate-50 focus-visible:ring-indigo-500" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company" className="text-slate-300">Company (Optional)</Label>
            <Input id="company" name="company" placeholder="Acme Corp" className="bg-slate-950 border-slate-800 text-slate-50 focus-visible:ring-indigo-500" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending} className="bg-indigo-600 hover:bg-indigo-500 text-white">
            {isPending ? 'Adding Client...' : 'Add Client'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
