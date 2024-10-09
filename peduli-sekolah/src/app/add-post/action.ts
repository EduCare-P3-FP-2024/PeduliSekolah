"use server";

import { z } from "zod";

// Define a Zod schema to validate the post input
const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  Category: z.string().min(1, "Category is required"),
  tags: z.string().min(1, "Tags are required"),
  imageUrl: z.any().refine((file) => file && typeof file !== "undefined", {
    message: "File (image) is required",
  }),
  deadline: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid deadline date",
  }),
});

const CreatePost = (formData: FormData) => {
  // Extract fields from formData
  const title = formData.get("title");
  const content = formData.get("content");
  const Category = formData.get("Category");
  const tags = formData.get("tags");
  const imageUrl = formData.get("imageUrl");
  const deadline = formData.get("deadLineAt");

  // Create the post input object
  const postInput = {
    title,
    content,
    slug: `${title}-${content}`,
    Category,
    tags,
    imageUrl,
    deadline,
    meta_description: `${title}-${content}`,
  };

  // Validate the input using the Zod schema
  const validation = postSchema.safeParse(postInput);

  if (!validation.success) {
    // If validation fails, log or return errors
    console.log("Validation Errors: ", validation.error.format());
    return { error: validation.error.format() };
  }

  // If validation passes, proceed with your logic (e.g., saving the post)
  console.log("Validated post input: ", validation.data);

  // Your logic to handle the validated post input (e.g., save to the database)
};

export { CreatePost };
