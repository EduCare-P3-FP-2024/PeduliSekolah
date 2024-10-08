"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Upload, FileText, Tag, Calendar, FileImage } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { Category } from "@/utils/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for DatePicker

export type PostInput = {
  title: string;
  content: string;
  slug: string;
  categoryId: string;
  amount: number;
  tags: string;
  imageUrl: string[];
  deadLineAt: Date;
  meta_description: string;
};

export default function Component() {
  const { control, handleSubmit } = useForm<PostInput>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const router = useRouter();

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

    if (imageUrls.length) {
      data.imageUrl = imageUrls;
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/post");
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
      setImageUrls((prev) => [...prev, result.info.secure_url]);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#ECF0F1] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#2C3E50]">Create New Post</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-[#34495E]">
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
                  className="border-[#2C3E50] focus:ring-[#27AE60] focus:border-[#27AE60]"
                />
              )}
            />
          </div>

          <div>
            <Label htmlFor="content" className="text-sm font-medium text-[#34495E]">
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
                  className="border-[#2C3E50] focus:ring-[#27AE60] focus:border-[#27AE60]"
                />
              )}
            />
          </div>

          <div>
            <Label htmlFor="categoryId" className="text-sm font-medium text-[#34495E]">
              Category
            </Label>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="block w-full p-2 bg-white border-[#2C3E50] rounded-md focus:ring-[#27AE60] focus:border-[#27AE60]"
                >
                  {categories.map((el, i) => (
                    <option key={i} value={el._id.toString()}>
                      {el.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <div>
            <Label htmlFor="tags" className="text-sm font-medium text-[#34495E]">
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
                  className="border-[#2C3E50] focus:ring-[#27AE60] focus:border-[#27AE60]"
                />
              )}
            />
          </div>

          <div>
            <Label htmlFor="deadLineAt" className="text-sm font-medium text-[#34495E]">
              Deadline At
            </Label>
            <Controller
              name="deadLineAt"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  selected={value ? new Date(value) : null} // Convert value to Date if it exists
                  onChange={(date) => onChange(date)} // Update the form state
                  showTimeSelect // Show time selection
                  dateFormat="Pp" // Format the date and time
                  className="border-[#2C3E50] focus:ring-[#27AE60] focus:border-[#27AE60] w-full p-2 rounded-md"
                  placeholderText="Select a date"
                />
              )}
            />
          </div>

          <div>
            <Label htmlFor="targetAmount" className="text-sm font-medium text-[#34495E]">
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
                  className="border-[#2C3E50] focus:ring-[#27AE60] focus:border-[#27AE60]"
                />
              )}
            />
          </div>

          <div>
            <Label htmlFor="imageUrl" className="text-sm font-medium text-[#34495E]">
              Upload Images
            </Label>
            <CldUploadButton
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
              onSuccess={handleUploadSuccess}
              className="bg-[#E67E22] text-white px-4 py-2 rounded-md hover:bg-[#D35400] transition-colors"
            >
              Upload Image
            </CldUploadButton>
            {imageUrls.length > 0 && (
              <p className="text-sm text-[#27AE60] mt-2">Images uploaded!</p>
            )}
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-[#2C3E50] hover:bg-[#34495E] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="animate-spin h-5 w-5">
                  <FileText className="h-5 w-5" />
                </div>
              ) : (
                "Submit Post"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
