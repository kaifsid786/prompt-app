import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const GET = async (req, { params }) => {
  console.log(`#${params.text}`);
  try {
    await connectToDB();
    const prompts = await Prompt.find();
    const filteredPrompts = prompts.filter((prompt) =>
      prompt.tag.includes(params.text)
    );
    const newFilteredPrompts = [];

    for (const prompt of filteredPrompts) {
      const userId = prompt.creator;
      const user = await User.findById(userId);

      if (user) {
        const newPrompt = { ...prompt.toObject(), creator: user.toObject() };
        newFilteredPrompts.push(newPrompt);
      }
    }

    if (!newFilteredPrompts) return new Response(null);

    return new Response(JSON.stringify(newFilteredPrompts), { status: 200 });
  } catch (e) {
    console.log(e);
  }
};
