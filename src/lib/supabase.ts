import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hkjukobqpjezhpxzplpj.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhranVrb2JxcGplemhweHpwbHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NTQ1MzgsImV4cCI6MjA2MjEzMDUzOH0.WK1_e0m2AkAq8yGFv3d_tKqDIzi72yoQ_lwoyDx8kcQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const BUCKET = "bless-images";

export function getPublicUrl(path: string): string {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
