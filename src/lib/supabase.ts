import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://foauuciychrtgigargva.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvYXV1Y2l5Y2hydGdpZ2FyZ3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5MzUwMzIsImV4cCI6MjA0ODUxMTAzMn0.G0I4PzmxrZAGyeKa1aZyff5MQXR783pr6QqqaiWf5xA';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
});