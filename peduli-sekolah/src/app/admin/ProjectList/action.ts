import { getPosts } from "@/db/models/post";
import { Post } from "@/utils/types";

export const getPostsList = async () => {
  const data = (await getPosts()) as Post[];

  return data;
};
