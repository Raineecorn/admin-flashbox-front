// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://crqpfmcvudkvwsvyenkv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNycXBmbWN2dWRrdndzdnllbmt2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyODg1OTg5NiwiZXhwIjoyMDQ0NDM1ODk2fQ.HQxNGutNq1P9b9eXZxLYHw4LGXjvNe2XI60gMAki4Es';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
