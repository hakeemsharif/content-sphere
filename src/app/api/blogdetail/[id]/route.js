import { createClient } from '@/utils/supabase/client'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const supabase = createClient()
  const { id } = await params

  const { data } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single()

  return NextResponse.json(data)
}
