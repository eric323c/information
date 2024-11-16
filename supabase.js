import { createClient } from './supabase.js'; // Ensure this path matches the actual location

const supabaseUrl = 'https://ydadnbbobjvwusyjgaxa.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkYWRuYmJvYmp2d3VzeWpnYXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3MzQwNzAsImV4cCI6MjA0NzMxMDA3MH0.PC43GVqiDoVgLhHfh-ibh7hEISG88YGeyk2Nz4XUthk'; // Replace with your Supabase API key
export const supabase = createClient(supabaseUrl, supabaseKey);
