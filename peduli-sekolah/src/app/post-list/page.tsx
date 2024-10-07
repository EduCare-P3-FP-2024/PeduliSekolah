"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
  "All",
  "Health",
  "Education",
  "Environment",
  "Technology",
  "Arts",
];

const posts = [
  {
    id: 1,
    title: "Save the Rainforest",
    category: "Environment",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Educate a Child",
    category: "Education",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Clean Water Initiative",
    category: "Health",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Innovative Tech Solutions",
    category: "Technology",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Support Local Artists",
    category: "Arts",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Green Energy Project",
    category: "Environment",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 7,
    title: "Mental Health Awareness",
    category: "Health",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 8,
    title: "Coding for Kids",
    category: "Education",
    image: "/placeholder.svg?height=200&width=300",
  },
];

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      (selectedCategory === "All" || post.category === selectedCategory) &&
      post.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-800">
        Explore Amazing Projects
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-1/3">
          <Input
            type="text"
            placeholder="Search projects..."
            className="pl-10 pr-4 py-2 rounded-full border-2 border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
            size={20}
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2 w-full md:w-auto">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? "bg-purple-600 text-white"
                  : "bg-white text-purple-600 hover:bg-purple-100"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {post.title}
              </h2>
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getCategoryColor(
                  post.category,
                )}`}
              >
                {post.category}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function getCategoryColor(category: string) {
  switch (category) {
    case "Health":
      return "bg-red-100 text-red-800";
    case "Education":
      return "bg-blue-100 text-blue-800";
    case "Environment":
      return "bg-green-100 text-green-800";
    case "Technology":
      return "bg-yellow-100 text-yellow-800";
    case "Arts":
      return "bg-pink-100 text-pink-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
