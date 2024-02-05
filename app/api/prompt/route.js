import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { cookies } from "next/headers";

export const GET = async (req) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: { "Set-Cookie": `token=${token}` },
    });
  } catch (e) {
    console.log(e);
  }
};
