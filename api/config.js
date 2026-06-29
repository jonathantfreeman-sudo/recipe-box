export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return res.status(500).json({ error: 'Supabase not configured' });
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.json({ supabaseUrl: url, supabaseAnonKey: key });
}
