import { account, avatars, supabase } from "./config";
import { INewUser } from "@/types";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.signUp(user.email, user.password);

    if (!newAccount) {
      throw new Error("Failed to create account");
    }

    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.name
    )}&background=random`;

    // const avatarUrl = avatars.generate(user.name);

    const newUser = await saveUserToDB({
      name: user.name,
      username: user.username,
      email: user.email,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function saveUserToDB(user: {
  name: string;
  username?: string;
  email: string;
  imageUrl: string;
}) {
  try {
    const newUser = await supabase.from("Users").insert(user);

    return newUser;
  } catch (error) {
    console.error(error);
  }
}
