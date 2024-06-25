"use server";
import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
export const signIn = async () => {
  try {
    //modify detabase, fetch
  } catch (error) {
    console.log(error);
  }
};
export const signUp = async (userData: SignUpParams) => {
  try {
    //modify detabase, fetch
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(ID.unique(), userData.email, userData.password, `${userData.firstName} ${userData.lastName}`);
    const session = await account.createEmailPasswordSession(userData.email, userData.password);

    cookies().set("appwirte-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true
    });
  } catch (error) {
    console.log(error);
  }
};

// ... your initilization functions

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}
