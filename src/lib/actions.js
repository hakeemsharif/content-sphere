'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
    options: {
      data: {
        role: "editor", // Set metadata during signup instead of afterward
      }
    }
  }
  
  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function update(formData) {
  const supabase = await createClient()

    // First, get the authenticated user securely
    const { data: { user }, error: userError } = await supabase.auth.getUser()
  
    if (userError) {
      redirect('/error')
    }
  
    
  const { error } = await supabase.auth.updateUser({
    data: {
      role: formData.get('role'),
      description: formData.get('description'),
    }
  })


  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/settings')
}