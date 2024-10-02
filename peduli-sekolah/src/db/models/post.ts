import { CreatePostInput, Post } from "@/utils/types";
import { getDb } from "./user";
import { ObjectId } from "mongodb";

const COLLECTION_POST = "posts";

export const getPosts = async () => {
  const db = await getDb();

  const posts = (await db
    .collection(COLLECTION_POST)
    .find({})
    .toArray()) as Post[];

  return posts;
};

export const createPost = async (postInput: CreatePostInput) => {
  const db = await getDb();

  const result = await db.collection(COLLECTION_POST).insertOne(postInput);

  return result;
};

export const getPostsByCategory = async (categoryId: string) => {
  const db = await getDb();

  const posts = (await db
    .collection(COLLECTION_POST)
    .find({ categoryId: new ObjectId(categoryId) })
    .toArray()) as Post[];

  return posts;
};

export const getPostById = async (id: string) => {
  const db = await getDb();

  const post = (await db
    .collection(COLLECTION_POST)
    .findOne({ _id: new ObjectId(id) })) as Post;

  return post;
};
