import { createClient } from '@/utils/supabase/client'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const supabase = createClient()
  const { slug } = await params

  const { data } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single()

  return NextResponse.json(data)
}
