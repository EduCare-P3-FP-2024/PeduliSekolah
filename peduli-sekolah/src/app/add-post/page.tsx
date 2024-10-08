"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { Upload, FileText, Tag, Calendar, FileImage } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary"; // For handling image uploads
import { useRouter } from "next/navigation";
import { Category } from "@/utils/types";
import { useEffect } from "react";

export type PostInput = {
  title: string;
  content: string;
  slug: string;
  categoryId: string;
  amount: number;
  tags: string;
  imageUrl: string[]; // Changed to array of image URLs
  deadLineAt: Date;
  meta_description: string;
};

const PostForm = () => {
  const { control, handleSubmit } = useForm<PostInput>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]); // Array of image URLs
  const router = useRouter();

  // Fetch categories from API
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
        console.error(err instanceof Error ? err.message : "Unknown error");
      }
    };
    fetchCategory();
  }, []);

  const onSubmit = async (data: PostInput) => {
    setIsSubmitting(true);

    // Add the uploaded image URLs to the form data
    if (imageUrls.length) {
      data.imageUrl = imageUrls;
    }

    // Post submission logic
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/post"); // Redirect to success page
      } else {
        throw new Error(`Submission failed: ${response.statusText}`);
      }
    } catch (err) {
      console.error("Submission error:", err);
    }

    setIsSubmitting(false);
  };

  const handleUploadSuccess = (result: any) => {
    if (result?.info?.secure_url) {
      setImageUrls((prev) => [...prev, result.info.secure_url]); // Append new image URL
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Create New Post</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Title
            </Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  id="title"
                  placeholder="Post title"
                  className="border-2 border-[#E67E22]"
                />
              )}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Label
              htmlFor="content"
              className="text-sm font-medium text-gray-700"
            >
              Content
            </Label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  rows={4}
                  id="content"
                  placeholder="Post content"
                  className="border-2 border-[#E67E22]"
                />
              )}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Label
              htmlFor="categoryId"
              className="text-sm font-medium text-gray-700"
            >
              Category
            </Label>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="block w-full p-2 border-2 border-[#E67E22] rounded-md"
                >
                  {categories.map((el, i) => (
                    <option
                      key={i}
                      value={el._id.toString()}
                    >
                      {el.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Label
              htmlFor="tags"
              className="text-sm font-medium text-gray-700"
            >
              Tags (comma-separated)
            </Label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  id="tags"
                  placeholder="Post tags"
                  className="border-2 border-[#E67E22]"
                />
              )}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Label
              htmlFor="deadLineAt"
              className="text-sm font-medium text-gray-700"
            >
              Deadline At
            </Label>
            <Controller
              name="deadLineAt"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="datetime-local"
                  id="deadLineAt"
                  className="border-2 border-[#E67E22]"
                />
              )}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Label
              htmlFor="targetAmount"
              className="text-sm font-medium text-gray-700"
            >
              Target Amount
            </Label>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  id="targetAmount"
                  placeholder="Target amount"
                  className="border-2 border-[#E67E22]"
                />
              )}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Label
              htmlFor="imageUrl"
              className="text-sm font-medium text-gray-700"
            >
              Upload Images
            </Label>
            <CldUploadButton
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
              onSuccess={handleUploadSuccess}
              className="border-2 border-[#E67E22] p-2 mx-3 rounded-sm hover:bg-black hover:text-white"
            />
            {imageUrls.length > 0 && (
              <p className="text-sm text-green-500">Images uploaded!</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <FileText className="h-5 w-5" />
                </motion.div>
              ) : (
                "Submit Post"
              )}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default PostForm;
