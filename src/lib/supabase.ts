import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yszxbahbkczvucybfbqi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzenhiYWhia2N6dnVjeWJmYnFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMjE5NjIsImV4cCI6MjA2ODc5Nzk2Mn0.sUETdFEw6jeDGlMzgxFg1k116F_VfyH-MEQAiBA1ANw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Profile {
  id: string
  email: string
  first_name: string
  last_name: string
  travel_start_date?: string
  travel_end_date?: string
  number_of_sims?: number
  device_imei?: string
  onboarding_completed?: boolean
  created_at: string
  updated_at: string
}
