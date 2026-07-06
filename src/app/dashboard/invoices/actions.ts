'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function addInvoice(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to add an invoice.' }
  }

  const project_id = formData.get('project_id') as string
  const status = formData.get('status') as string || 'Pending'
  const amountRaw = formData.get('amount') as string
  const amount = amountRaw ? parseFloat(amountRaw) : 0
  const due_date = formData.get('due_date') as string

  if (!project_id) {
    return { error: 'Project is required.' }
  }

  if (!amount || amount <= 0) {
    return { error: 'Valid amount is required.' }
  }

  if (!due_date) {
    return { error: 'Due date is required.' }
  }

  const { error } = await supabase
    .from('invoices')
    .insert([
      { 
        user_id: user.id, 
        project_id,
        amount, 
        status, 
        due_date 
      }
    ])

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/invoices')
  return { success: true }
}
