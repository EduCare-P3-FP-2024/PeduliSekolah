import { NextResponse } from "next/server";
import { getPosts } from "@/db/models/post";
import { createPost } from "@/db/models/post";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Extract query parameters from the request URL
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "All";

    // Fetch posts from the database with pagination, category, and search
    const posts = await getPosts(Number(page), category, search);

    // Response object with paginated posts
    return NextResponse.json({
      data: posts,
      currentPage: Number(page),
      totalPages: Math.ceil(posts.length / Number(limit)),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}

export type Post = {
  _id: ObjectId;
  title: string;
  content: string;
  userId: ObjectId;
  slug: string;
  categoryId: ObjectId;
  tags: string[];
  imageUrl: [string];
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deadLineAt: Date;
  amount: number;
  target_amount: number;
  featured_status: boolean;
  meta_description?: string;
};

export const POST = async (req: Request) => {
  try {
    const {
      title,
      content,
      categoryId,
      amount,
      tags,
      imageUrl, // now array of strings
      deadLineAt,
      meta_description,
    } = await req.json();

    console.log("Title:", title);
    console.log("Content:", content);

    console.log("Category ID:", categoryId);
    console.log("Amount:", amount);
    console.log("Tags:", tags);
    console.log("Image URLs:", imageUrl); // array of image URLs
    console.log("Deadline:", deadLineAt);
    console.log("Meta Description:", meta_description);

    // Lakukan logika lain di sini, seperti menyimpan ke database, dsb.

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
      });
    } else {
      return new Response(
        JSON.stringify({ error: "An unknown error occurred." }),
        { status: 500 },
      );
    }
  }
};
