import OpenAI from "openai";
// import fetch from "node-fetch";
// import FormData from "form-data";
import fs from "fs";

//increase timeout to 25s instead of 10s
// export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  
  const { input } = await request.json();

  //hacky solution to get image from url
      // const imageUrl = 'main/public/samMask.png'
      //   "https://raw.githubusercontent.com/samuelahmed/CanvasCloak/main/public/samMask.png";
      // const response = await fetch(imageUrl);
      // const blob = await response.blob();
      // const formData = new FormData();
      // formData.append("image", blob, "image.png");

      
      // const result = await openai.images.edit({
      //   image: formData.get("image"),
      //   prompt: input,
      // });

      // const result = await openai.images.edit(
      //   // fs.createReadStream("sunlit_lounge.png"),
      //   fs.createReadStream("blankMask.png"),
      //   "dall-e-2",
      //   "A sunlit indoor lounge area with a pool containing a flamingo",
      //   1,
      //   // "1024x1024"
      // );

      // image_url = response.data.data[0].url;

      const result = await openai.images.edit({
        image: fs.createReadStream("public/billTest1.png"),
        // mask: fs.createReadStream("public/example.jpg"),
        size: "1024x1024", 
        prompt: input,
      });

      console.log("ImageEdit Called");
      console.log(result);
  

  return new Response(JSON.stringify({ image: result }), { status: 200 });
}
