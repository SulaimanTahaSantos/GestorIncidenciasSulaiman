import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://flnqqkjwltedwlapaloy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbnFxa2p3bHRlZHdsYXBhbG95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MTM2MTMsImV4cCI6MjA1NzI4OTYxM30.lHM3RLzE2mJiYTSFwbHn9802vYGz_0Wji7G6VPm6fWM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
