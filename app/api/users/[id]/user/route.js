import { connectToDB } from "@utils/database";

import User from "@models/user";

export const GET = async (req, { params }) => {
  try {
    connectToDB();
    const { id } = params;
    const user = await User.findOne({ _id: id });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch Prompt", { status: 500 });
  }
};
