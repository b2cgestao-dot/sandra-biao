import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nxpekusfltieakutcuvv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54cGVrdXNmbHRpZWFrdXRjdXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMDk5NDgsImV4cCI6MjA4OTg4NTk0OH0.tNrFXk68MBXwvL62k9IfL9fiHAyFqHunxb4_uCRqQI0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
