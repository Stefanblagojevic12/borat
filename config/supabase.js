import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://itllssqpqnyuydbdicai.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bGxzc3FwcW55dXlkYmRpY2FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0OTk4ODUsImV4cCI6MjA1NTA3NTg4NX0.vBj0oJEOz2Z_IVlFbNNRTXdT-W7vjTWqWeMvuQI4YVY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 