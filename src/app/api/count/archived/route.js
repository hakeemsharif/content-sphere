import { createClient } from '@/utils/supabase/client'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const supabase = createClient()

    const { count, error } = await supabase
        .from('blogs')
        .select('*', { count: 'exact'})
        .eq('status', 'Archived');

    return NextResponse.json(count);
}
