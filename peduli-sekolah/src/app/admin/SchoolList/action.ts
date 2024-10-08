"use server";

import { getDocuments } from "@/db/models/schoolDocument";
import { bannedUser } from "@/db/models/user";
import { cookies } from "next/headers";

export const getSchoolList = async () => {
  const data = await getDocuments();
  return data;
};

export const banUser = async (id: string) => {
  const result = await bannedUser(id);
  return result;
};

export const deleteAuthCookies = async () => {
  const cookieStore = cookies(); // Use cookies() once and assign it to a variable
  cookieStore.delete("token");
  cookieStore.delete("userId");
  cookieStore.delete("username");
  cookieStore.delete("role");
  cookieStore.delete("accountType");
};
