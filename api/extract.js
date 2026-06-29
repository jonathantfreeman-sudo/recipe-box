export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL required' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  const prompt = `You are a recipe extraction assistant. Extract all recipe info from the URL and return ONLY valid JSON (no markdown, no backticks, no explanation) with these exact fields:
{
  "title": "Recipe name",
  "source": "Website or author name",
  "servings": "4 servings",
  "time": "30 mins",
  "difficulty": "Easy",
  "emoji": "single fitting emoji",
  "description": "One sentence description",
  "ingredients": ["amount + ingredient", ...],
  "steps": ["Step instruction", ...],
  "tags": ["up to 3 relevant tags from: asian, spicy, italian, mexican, vegetarian, vegan, gluten-free, quick, comfort, healthy, dessert, american, mediterranean, indian"]
}
URL: ${url}
If you cannot access the URL, use the URL path to infer the recipe type and create reasonable placeholder data. Return only valid JSON.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Anthropic API error' });
    }

    let text = '';
    for (const block of data.content) {
      if (block.type === 'text') text += block.text;
    }

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return res.status(422).json({ error: 'Could not parse recipe data' });

    const recipe = JSON.parse(jsonMatch[0]);
    return res.status(200).json(recipe);
  } catch (err) {
    console.error('Extract error:', err);
    return res.status(500).json({ error: 'Failed to extract recipe' });
  }
}
