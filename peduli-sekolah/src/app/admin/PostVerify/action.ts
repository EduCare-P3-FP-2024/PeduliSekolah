"use server";
import {
  adminGetPosts,
  updatePostPublished,
  updatePostRejected,
} from "@/db/models/post";
import { Post } from "@/utils/types";
import { redirect } from "next/navigation";

export const getAdminPostList = async (page: number) => {
  const data = (await adminGetPosts(page)) as Post[];
  return data;
};

export const postPublished = async (id: string) => {
  const result = await updatePostPublished(id);
  return result;
};

export const postRejected = async (id: string) => {
  const result = await updatePostRejected(id);
  return result;
};
