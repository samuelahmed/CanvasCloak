import OpenAI from "openai";

import fetch from "node-fetch";
import FormData from "form-data";

//increase timeout to 25s instead of 10s
export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const { input } = await request.json();
  const imageUrl =
    "https://raw.githubusercontent.com/samuelahmed/openAItest/dfc66463df07f954fd7fd012f73f100c675f5a63/public/chiMask.png";
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    console.log(`Image size: ${blob.size} bytes`);

  
    const formData = new FormData();
    formData.append("image", blob, "image.png");
  
    const result = await openai.images.edit({
      image: formData.get("image"),
      prompt: input,
    });
 


  console.log("ImageEdit Called");
  console.log(result);

  return new Response(JSON.stringify({ image: result }), { status: 200 });
}
