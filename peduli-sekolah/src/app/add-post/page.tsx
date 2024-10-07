"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Category } from "@/utils/types";
import { FormEvent } from "react";

const handlePost = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  // Handle multiple image files
  const imageFiles = formData.getAll("imageUrl") as File[];
  const imageUrls: string[] = await Promise.all(
    imageFiles.map(async (file) => {
      const reader = new FileReader();
      return new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file); // convert image to base64 URL
      });
    }),
  );

  const postInput = {
    title: formData.get("title"),
    content: formData.get("content"),
    slug: formData.get("slug"),
    categoryId: formData.get("Category"),
    amount: formData.get("content"),
    tags: formData.get("tags"),
    imageUrl: imageUrls, // array of image URLs
    deadLineAt: formData.get("deadLineAt"),
    meta_description: formData.get("meta_description"),
  };

  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postInput),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit post: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Post successfully submitted:", result);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error submitting post:", err.message);
    } else {
      console.error("An unknown error occurred.");
    }
  }
};

const PostForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const url = "http://localhost:3000/api/categories";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setCategories(json);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log("An unknown error occurred.");
        }
      }
    };
    fetchCategory();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#ECF0F1] py-12">
      <div className="container mx-auto">
        <form
          onSubmit={handlePost}
          className="space-y-6 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md"
          encType="multipart/form-data"
        >
          <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              rows={5}
            />
          </div>

          <div>
            <Label htmlFor="categoryId">Category</Label>
            <select name="Category">
              {categories.map((el, i) => (
                <option
                  key={i}
                  value={el._id.toString()}
                >
                  {el.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              name="tags"
            />
          </div>

          <div>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="file"
              multiple
            />
          </div>

          <div>
            <Label htmlFor="deadLineAt">Deadline At</Label>
            <Input
              type="datetime-local"
              id="deadLineAt"
              name="deadLineAt"
            />
          </div>

          <div>
            <Label htmlFor="meta_description">Meta Description</Label>
            <Textarea
              id="meta_description"
              name="meta_description"
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
          >
            Submit Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
