import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://wrhzgfbagrkzowdamdel.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyaHpnZmJhZ3Jrem93ZGFtZGVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDgzMjAsImV4cCI6MjA4NzAyNDMyMH0.nB6q0cawZOZrCOGPCbQNSo_-LE9P96Eq27jj4uEbsYg";

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
