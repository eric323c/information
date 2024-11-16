// supabase.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js';

// Your Supabase API URL and Public Key (Anon Key)
const supabaseUrl = 'https://ydadnbbobjvwusyjgaxa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkYWRuYmJvYmp2d3VzeWpnYXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3MzQwNzAsImV4cCI6MjA0NzMxMDA3MH0.PC43GVqiDoVgLhHfh-ibh7hEISG88YGeyk2Nz4XUthk';

export const supabase = createClient(supabaseUrl, supabaseKey);
