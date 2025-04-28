import { createClient } from '@/utils/supabase/client'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const supabase = createClient()

  const { data } = await supabase
    .from('blogs')
    .select()
    .order('id', { ascending: true })


  return NextResponse.json(data);
}
