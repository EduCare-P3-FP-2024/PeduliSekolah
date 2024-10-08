"use server";

import { getDocuments } from "@/db/models/schoolDocument";
import { bannedUser } from "@/db/models/user";

export const getSchoolList = async () => {
  const data = await getDocuments();

  return data;
};

export const banUser = async (id: string) => {
  const result = await bannedUser(id);

  return result;
};
