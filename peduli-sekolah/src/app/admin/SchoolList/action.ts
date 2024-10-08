"use server";

import { getDocuments } from "@/db/models/schoolDocument";
import { cookies } from "next/headers";

export const getSchoolList = async () => {
  const data = await getDocuments();

  return data;
};

export const deleteAuthCookies = async () => {
  cookies().delete("token");
  cookies().delete("userId");
  cookies().delete("username");
  cookies().delete("role");
  cookies().delete("accountType");
};
