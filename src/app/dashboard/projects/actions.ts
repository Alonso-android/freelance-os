'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function addProject(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to add a project.' }
  }

  const name = formData.get('name') as string
  const client_id = formData.get('client_id') as string
  const status = formData.get('status') as string || 'Planning'
  const budgetRaw = formData.get('budget') as string
  const budget = budgetRaw ? parseFloat(budgetRaw) : 0

  if (!name || !client_id) {
    return { error: 'Project name and client are required.' }
  }

  const { error } = await supabase
    .from('projects')
    .insert([
      { 
        user_id: user.id, 
        client_id,
        name, 
        status, 
        budget 
      }
    ])

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/projects')
  return { success: true }
}
