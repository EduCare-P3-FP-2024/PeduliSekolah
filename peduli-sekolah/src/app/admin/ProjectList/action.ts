import { getPosts } from "@/db/models/post";
import { Post } from "@/utils/types";

export const getPostsList = async (
  page: number,
  category: string,
  searchTerm: string,
) => {
  const data = (await getPosts(page, category, searchTerm)) as Post[];

  return data;
};
