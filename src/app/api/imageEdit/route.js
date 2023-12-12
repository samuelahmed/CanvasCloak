import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const { input } = await request.json();

  const result = await openai.images.edit({
    image: fs.createReadStream("public/chiMask.png"),
    // mask: fs.createReadStream("public/example.jpg"),

    prompt: input,
  });

  console.log("ImageEdit Called");
  console.log(result);

  return new Response(JSON.stringify({ image: result }), { status: 200 });
}

//increase timeout to 25s instead of 10s
// export const runtime = 'edge';
