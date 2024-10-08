"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { Upload, MapPin, User, Mail, Phone, FileText } from "lucide-react";
import Cookies from "js-cookie"; // Import js-cookie
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";
import { SchoolProfile } from "@/utils/types"; // Adjust path accordingly
import { useRouter } from "next/navigation"; // For redirecting after form submission
import { toast } from "@/hooks/use-toast";

export type SchoolProfileInput = Omit<SchoolProfile, "status"> & {
  imageFileUrl?: string[];
};

export default function SchoolProfileForm() {
  const { control, handleSubmit } = useForm<SchoolProfileInput>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const router = useRouter();

  const onSubmit = async (data: SchoolProfileInput) => {
    setIsSubmitting(true);

    if (imageUrl.length) {
      data.imageFileUrl = imageUrl;
    }

    // Extract userId from cookies using js-cookie
    const userId = Cookies.get('userId'); 

    console.log(userId);
    

    if (!userId) {
      toast({
        title: "Unauthorized",
        description: "User is not logged in",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Check if the payee already exists
    const checkPayeeResponse = await fetch(`/api/check-payee?userId=${userId}`);
    const checkPayeeData = await checkPayeeResponse.json();

    if (checkPayeeData.exists) {
      toast({
        title: "Payee Exists",
        description: "A payee with this user ID already exists. No need to create another.",
        variant: "default",
      });
      setIsSubmitting(false);
      return; // Prevent further submission and redirect
    }

    // Proceed to create the school document if the payee doesn't exist
    const submissionData = {
      ...data,
      userId,
      status: "pending",
    };

    const response = await fetch("/api/school-document", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    });

    if (response.ok) {
      toast({
        title: "Success",
        description: "School profile created successfully.",
        variant: "success",
      });
      router.push("/payee");
    } else {
      toast({
        title: "Error",
        description: "Failed to create school profile.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  const handleUploadSuccess = (result: any) => {
    if (result?.info?.secure_url) {
      setImageUrl((prev) => [...prev, result.info.secure_url]);
    }
  };

  const formFields = [
    { name: "name", label: "Name", icon: User, type: "text" },
    { name: "email", label: "Email", icon: Mail, type: "email" },
    { name: "phoneNumber", label: "Phone Number", icon: Phone, type: "tel" },
    { name: "location", label: "Location", icon: MapPin, type: "text" },
  ];

  return (
    <div className="min-h-screen w-screen bg-[#ECF0F1] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl mx-auto lg:w-3/4 xl:w-2/3"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-[#2C3E50]">
          School Profile Form
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formFields.map((field, index) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Label
                  htmlFor={field.name}
                  className="text-sm font-medium text-[#34495E]"
                >
                  {field.label}
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <field.icon className="h-5 w-5 text-[#2C3E50]" aria-hidden="true" />
                  </div>
                  <Controller
                    name={field.name as keyof SchoolProfileInput}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type={field.type}
                        className="block w-full pl-10 sm:text-sm border-[#2C3E50] rounded-md focus:ring-[#E67E22] focus:border-[#E67E22] text-[#34495E]"
                        placeholder={field.label}
                      />
                    )}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Label htmlFor="file" className="text-sm font-medium text-[#34495E]">
              Upload Image
            </Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[#2C3E50] border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-[#2C3E50]" />
                <CldUploadButton
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                  onSuccess={handleUploadSuccess}
                  className="text-[#2C3E50] hover:text-[#E67E22]"
                />
                <p className="text-xs text-[#34495E]">
                  PNG, JPG, GIF up to 10MB
                </p>
                {imageUrl.length > 0 && (
                  <p className="text-sm text-[#27AE60]">Image Uploaded!</p>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2C3E50] hover:bg-[#E67E22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#27AE60]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-4 border-white border-t-transparent rounded-full"
                />
              ) : (
                "Submit Profile"
              )}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
