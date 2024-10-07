'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const categories = [
  "All",
  "Health",
  "Education",
  "Environment",
  "Technology",
  "Arts",
]

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      try {
        const response = await fetch(
          `/api/posts?page=1&category=${selectedCategory}&search=${searchTerm}`
        )
        const data = await response.json()
        setPosts(data.data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [selectedCategory, searchTerm])

  return (
    <div className="min-h-screen w-full bg-[#ECF0F1] p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-[#2C3E50]">
        Explore Amazing Projects
      </h1>

      {/* Search and Category Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 space-y-4 md:space-y-0 md:space-x-4 w-full">
        {/* Search Input */}
        <div className="relative w-full md:w-1/2 lg:w-1/3">
          <Input
            type="text"
            placeholder="Search projects..."
            className="pl-10 pr-4 py-2 rounded-full border-2 border-[#E67E22] focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22] bg-white w-full text-[#34495E]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#E67E22]"
            size={20}
          />
        </div>

        {/* Category Buttons */}
        <div className="flex space-x-2 overflow-x-auto pb-2 w-full md:w-auto">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? "bg-[#2C3E50] text-[#E67E22] border-2 border-[#E67E22]"
                  : "bg-white text-[#34495E] hover:bg-[#E67E22] hover:text-white border-2 border-transparent"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <p className="text-center text-[#34495E]">Loading projects...</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {posts.map((post) => (
            <motion.div
              key={post._id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-[#E67E22]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={post.image || "/placeholder.svg?height=200&width=300"}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-[#2C3E50]">
                  {post.title}
                </h2>
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getCategoryColor(
                    post.category
                  )}`}
                >
                  {post.category}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

function getCategoryColor(category: string) {
  switch (category) {
    case "Health":
      return "bg-[#E67E22] text-white";
    case "Education":
      return "bg-[#2C3E50] text-white";
    case "Environment":
      return "bg-[#27AE60] text-white";
    case "Technology":
      return "bg-[#34495E] text-white";
    case "Arts":
      return "bg-[#ECF0F1] text-[#2C3E50]";
    default:
      return "bg-[#ECF0F1] text-[#34495E]";
  }
}