import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://znibitkkqakowwmnrkoi.supabase.co'

const supabaseKey = 'sb_publishable_Rppcn9htTBewG3myHGnz-A_Gh7IfA_Q'

export const supabase = createClient(supabaseUrl, supabaseKey)