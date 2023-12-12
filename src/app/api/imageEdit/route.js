import OpenAI from "openai";
import fs from "fs";
import path from "path";

//increase timeout to 25s instead of 10s
// export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const { input } = await request.json();
  console.log("Current directory: " + process.cwd());

  const dir = path.resolve('public/chiMask.png')

  const result = await openai.images.edit({
    
    image: fs.createReadStream(dir),
    prompt: input,
  });

  console.log("ImageEdit Called");
  console.log(result);

  return new Response(JSON.stringify({ image: result }), { status: 200 });
}


