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
export const deleteAuthCookies = async () => {
  cookies().delete("token");
  cookies().delete("userId");
  cookies().delete("username");
  cookies().delete("role");
  cookies().delete("accountType");
};
