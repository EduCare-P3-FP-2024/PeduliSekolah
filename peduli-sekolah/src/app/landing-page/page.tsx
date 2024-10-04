"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Recycle, Wind, Droplet } from "lucide-react";

// New color palette
const colors = {
  primary: "#4CAF50",
  secondary: "#8BC34A",
  accent: "#FFC107",
  background: "#F1F8E9",
};

export default function EcoLanding() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-background text-gray-800">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: colors.background }}
      >
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/placeholder.svg?height=1080&width=1920&text=Eco+Friendly+Background"
            alt="Eco-friendly Background"
            layout="fill"
            objectFit="cover"
          />
        </motion.div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ color: colors.primary }}
          >
            EcoLife Products
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          >
            Embrace a sustainable lifestyle with our eco-friendly products.
            Together, we can make a positive impact on our planet.
          </motion.p>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
          >
            <a
              href="#products"
              className="px-6 py-3 rounded-full text-white font-semibold transition-colors duration-300"
              style={{ backgroundColor: colors.secondary }}
            >
              Explore Products
            </a>
            <a
              href="#about"
              className="px-6 py-3 rounded-full text-white font-semibold transition-colors duration-300"
              style={{ backgroundColor: colors.accent }}
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: colors.background }}
      >
        <div className="container mx-auto">
          <h2
            className="text-3xl font-bold mb-12 text-center"
            style={{ color: colors.primary }}
          >
            Why Choose EcoLife?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: "Sustainable Materials" },
              { icon: Recycle, title: "100% Recyclable" },
              { icon: Wind, title: "Carbon Neutral" },
              { icon: Droplet, title: "Water Efficient" },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-xl p-6 text-center"
              >
                <feature.icon
                  className="w-12 h-12 mx-auto mb-4"
                  style={{ color: colors.secondary }}
                />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: colors.secondary }}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">
            Our Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Bamboo Toothbrush", image: "bamboo-toothbrush" },
              { title: "Reusable Water Bottle", image: "water-bottle" },
              { title: "Organic Cotton Tote", image: "cotton-tote" },
            ].map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-xl overflow-hidden"
              >
                <Image
                  src={`/placeholder.svg?height=300&width=400&text=${product.image.replace(
                    "-",
                    "+",
                  )}`}
                  alt={product.title}
                  width={400}
                  height={300}
                  layout="responsive"
                />
                <div className="p-6">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: colors.primary }}
                  >
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Eco-friendly and sustainable. Made with care for the
                    environment.
                  </p>
                  <motion.a
                    href={`#${product.title.toLowerCase().replace(" ", "-")}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block px-4 py-2 rounded-full text-white font-semibold transition-colors duration-300"
                    style={{ backgroundColor: colors.accent }}
                  >
                    Learn More
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
          >
            Join the EcoLife Movement
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white mb-8 max-w-2xl mx-auto"
          >
            Subscribe to our newsletter for eco-tips, exclusive discounts, and
            updates on our latest products.
          </motion.p>
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-full w-full md:w-auto"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full text-white font-semibold transition-colors duration-300"
              style={{ backgroundColor: colors.accent }}
            >
              Subscribe
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
