// Supabase Configuration
const SUPABASE_URL = 'https://iqoafacenrewvftyneqc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlxb2FmYWNlbnJld3ZmdHluZXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4OTk1OTQsImV4cCI6MjA5NTQ3NTU5NH0.RdUK67WBjnoqOfdCg4C-SljZnopbFehBxDUjU_1SJYo';

// Initialize Supabase client
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Get base URL for contact pages
function getBaseUrl() {
    const url = window.location.href;
    // Remove the filename from the URL
    return url.substring(0, url.lastIndexOf('/') + 1);
}

// Export for use in other scripts
window.supabaseClient = supabaseClient;
window.getBaseUrl = getBaseUrl;
