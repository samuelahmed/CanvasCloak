import OpenAI from "openai";

//increase timeout to 25s instead of 10s
export const runtime = 'edge'; 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {

  const { input } = await request.json();

  const embedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: input,
    encoding_format: "float",
  });

  console.log('Embedding Called');
  return new Response(JSON.stringify({ input, embedding }), { status: 200 });
}

