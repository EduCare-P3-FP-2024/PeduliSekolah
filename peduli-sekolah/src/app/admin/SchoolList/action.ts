import { getDocuments } from "@/db/models/schoolDocument";

export const getSchoolList = async () => {
  const data = await getDocuments();

  return data;
};
