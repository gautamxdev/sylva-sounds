import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mbhfiedgboekhutowmei.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_o1fRdbrR3ulLB0Hd1gvyhA_vqE5srYw";

let cachedClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (cachedClient) return cachedClient;
  cachedClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cachedClient;
}
