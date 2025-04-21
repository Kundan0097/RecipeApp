// src/app/api/generate/route.ts
import { pipeline } from '@xenova/transformers';

export async function POST(req: Request) {
  const { prompt } = await req.json();
  if (!prompt) {
    return new Response(JSON.stringify({ error: 'Prompt is required' }), { status: 400 });
  }

  try {
    // Load the model and generate text
    const generator = await pipeline('text-generation', 'DeepSeek-R1-Zero');
    console.log('Generator loaded:', generator);
    const output = await generator(prompt, { max_new_tokens: 100 });

    // Send generated text back as a response
    return new Response(JSON.stringify({ result: output }), { status: 200 });
  } catch (err) {
    console.error('Error with transformers.js:', err);
    return new Response(JSON.stringify({ error: 'Error generating text' }), { status: 500 });
  }
}
