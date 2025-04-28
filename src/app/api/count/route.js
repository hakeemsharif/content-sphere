import { createClient } from '@/utils/supabase/client'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("category_counts_per_month")
    .select("*");
  

  return NextResponse.json(data);
}
