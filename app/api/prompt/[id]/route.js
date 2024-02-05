//Get method(read)
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.findById(params.id).populate("creator");
    if (!prompts) return new Response("Prompt Not Found", { status: 404 });
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (e) {
    console.log(e);
  }
};

// PATCH method(update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt Not Found", { status: 404 });
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response("Failed to update", { status: 500 });
  }
};
// DELETE method(delete)
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt Deleted Succesfully", { status: 200 });
  } catch (e) {
    return new Response("Failed to delete", { status: 500 });
  }
};
