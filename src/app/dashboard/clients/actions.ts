'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function addClient(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to add a client.' }
  }

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const company = formData.get('company') as string

  if (!name || !email) {
    return { error: 'Name and email are required.' }
  }

  const { error } = await supabase
    .from('clients')
    .insert([
      { 
        user_id: user.id, 
        name, 
        email, 
        company 
      }
    ])

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/clients')
  return { success: true }
}
