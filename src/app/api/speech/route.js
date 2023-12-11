import OpenAI from "openai";

//increase timeout to 25s instead of 10s
export const runtime = 'edge'; 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {

  const { voice, content } = await request.json();

  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: voice,
    input: content,
  });

  console.log("Speech Called");
  const blob = new Blob([await mp3.arrayBuffer()], { type: "audio/mpeg" });
  return new Response(blob);
}
