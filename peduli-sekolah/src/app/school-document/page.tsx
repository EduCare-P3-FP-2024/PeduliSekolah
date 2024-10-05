"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { Upload, MapPin, User, Mail, Phone, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Component() {
  const { control, handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    setIsSubmitting(false);
  };

  const formFields = [
    { name: "name", label: "Name", icon: User, type: "text" },
    { name: "email", label: "Email", icon: Mail, type: "email" },
    { name: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { name: "location", label: "Location", icon: MapPin, type: "text" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-teal-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-800">
          Contact Us
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {formFields.map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Label
                htmlFor={field.name}
                className="text-sm font-medium text-gray-700"
              >
                {field.label}
              </Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <field.icon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type={field.type}
                      className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder={field.label}
                    />
                  )}
                />
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Label htmlFor="file" className="text-sm font-medium text-gray-700">
              Upload File
            </Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                  >
                    <span>Upload a file</span>
                    <Controller
                      name="file"
                      control={control}
                      render={({ field }) => (
                        <input
                          id="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={(e) => field.onChange(e.target.files[0])}
                        />
                      )}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </Label>
            <div className="mt-1">
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    rows={4}
                    className="shadow-sm focus:ring-purple-500 focus:border-purple-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Tell us more about your request..."
                  />
                )}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
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
                "Submit"
              )}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
