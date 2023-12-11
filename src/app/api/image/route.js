import OpenAI from "openai";

//increase timeout to 25s instead of 10s
export const runtime = 'edge'; 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
    
  const { input } = await request.json();

  const result = await openai.images.generate({
    model: "dall-e-2",
    // dall-e-3 burns too many credits
    // model: "dall-e-3",
    prompt: input,
  });

  console.log("Image Called");
  return new Response(JSON.stringify({ image: result }), { status: 200 });
}
