'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { signup } from './actions'

const initialState = {
  error: null as string | null,
}

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(signup, initialState)

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
      <div className="flex justify-center mb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] text-xl">
            F
          </div>
          <span className="text-2xl font-bold tracking-tight">FreelanceOS</span>
        </Link>
      </div>
      
      <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-xl shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-white">Create an account</CardTitle>
          <CardDescription className="text-center text-slate-400">
            Enter your details to get started
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            {state?.error && (
              <div className="p-3 text-sm text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-md">
                {state.error}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-slate-300">First name</Label>
                <Input id="first-name" name="first-name" required placeholder="John" className="bg-slate-950 border-slate-800 text-slate-50 focus-visible:ring-indigo-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name" className="text-slate-300">Last name</Label>
                <Input id="last-name" name="last-name" required placeholder="Doe" className="bg-slate-950 border-slate-800 text-slate-50 focus-visible:ring-indigo-500" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="m@example.com" className="bg-slate-950 border-slate-800 text-slate-50 focus-visible:ring-indigo-500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <Input id="password" name="password" type="password" required minLength={6} className="bg-slate-950 border-slate-800 text-slate-50 focus-visible:ring-indigo-500" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" disabled={isPending} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white">
              {isPending ? 'Creating Account...' : 'Create Account'}
            </Button>
            <div className="text-center text-sm text-slate-400">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
