import { createClient } from '@/utils/supabase/client'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const supabase = createClient()

  const { data } = await supabase
    .from('categories')
    .select()

  return NextResponse.json(data);
}
