import { account } from "./config";
import { INewUser } from "@/types";

export async function createUserAccount(user: INewUser) {
  try {
    const newUser = await account.signUp(user.email, user.password);

    if (!newUser) {
      throw new Error("Failed to create account");
    }

    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.name
    )}&background=random`;

    return {
      accountId: newUser.id,
      name: user.name,
      email: user.email,
      username: user.username,
      imageUrl: avatarUrl,
    };
  } catch (error) {
    console.error(error);
    return error;
  }
}
