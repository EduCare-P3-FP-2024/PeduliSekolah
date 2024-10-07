import { CreatePostInput, Post } from "@/utils/types";
import { getDb } from "./user";
import { ObjectId } from "mongodb";

const COLLECTION_POST = "posts";
// const agg = [
//   {
//     $lookup: {
//       from: "votes",
//       localField: "_id",
//       foreignField: "postId",
//       as: "votes",
//     },
//   },
//   {
//     $project: {
//       votes: { $size: "votes" },
//     },
//   },
// ];

export const getPosts = async (page: number, category: string, searchTerm: string) => {
  const db = await getDb();
  const perPage = 10;
  const skip = (page - 1) * perPage;

  const query: any = {};
  if (category !== "All") {
    query.category = category;
  }
  if (searchTerm) {
    query.title = { $regex: searchTerm, $options: "i" }; // Case-insensitive search
  }

  const posts = await db
    .collection(COLLECTION_POST)
    .find(query)
    .skip(skip)
    .limit(perPage)
    .toArray() as Post[];

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

export const getPostByUserId = async (id: string) => {
  const db = await getDb();

  const post = (await db
    .collection(COLLECTION_POST)
    .findOne({ userId: new ObjectId(id) })) as Post;

  return post;
};
