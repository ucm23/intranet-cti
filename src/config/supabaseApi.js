import { createClient } from '@supabase/supabase-js';
// config/supabaseApi.js
export const SUPABASE_URL = 'https://centlyhwvjyfxatfuhke.supabase.co'; // Reemplaza con tu URL
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlbnRseWh3dmp5ZnhhdGZ1aGtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc4ODg0OTQsImV4cCI6MjA0MzQ2NDQ5NH0.Sim6NbbhoDvhtF3qdXxvFnY8YKb55JNHywWODRQkUvs'; // Reemplaza con tu clave anónima
export const SUPABASE_SERVICE_ROLE_KEY = 'tu-service-role-key'; // Para operaciones admin (opcional)

// Configuración base para fetch
export const supabaseHeaders = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
};

// URL base para la API REST de Supabase
export const SUPABASE_REST_URL = `${SUPABASE_URL}/rest/v1`;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);