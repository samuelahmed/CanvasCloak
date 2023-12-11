import OpenAI from "openai";

//increase timeout to 25s instead of 10s
export const runtime = 'edge'; 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {

  const { content } = await request.json();

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: content }],
    model: "gpt-3.5-turbo",
  });

  console.log("Completion Called");
  return new Response(JSON.stringify(completion), { status: 200 });
}
