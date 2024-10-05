"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Recycle, Wind, Droplet } from "lucide-react";
import Link from "next/link";

// Updated color palette with lightest pastel color as dominant
const colors = {
  primary: "#C4EBFF", // Lighter Blue Accent (new dominant color)
  secondary: "#A8D5BA", // Pastel Green
  accent: "#A3DAFF", // Pastel Blue
  background: "linear-gradient(135deg, #E0F7FF, #B8E8B8)", // Smooth gradient from pastel blue to pastel green
  textPrimary: "#3A6351", // Darker green for text
  buttonHover: "#95CDA5", // Slightly darker green for hover states
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
        style={{ background: colors.background }}
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
            style={{ color: colors.primary }} // Updated to use primary color
          >
            Peduli Sekolah
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: colors.textPrimary }}
          >
            Every child deserves a chance to learn. Join us in building brighter
            futures for underserved schools.
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
              style={{ backgroundColor: colors.accent }} // Updated to use accent color
            >
              Post
            </a>
            <a
              href="#about"
              className="px-6 py-3 rounded-full text-white font-semibold transition-colors duration-300"
              style={{ backgroundColor: colors.secondary }} // Updated to use secondary color
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4" style={{ background: colors.background }}>
        <div className="container mx-auto">
          <h2
            className="text-3xl font-bold mb-12 text-center"
            style={{ color: colors.primary }} // Updated to use primary color
          >
            Why Choose PeduliSekolah?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: "Real School, Real People" },
              { icon: Recycle, title: "Community Impact" },
              { icon: Wind, title: "A Second Chance" },
              { icon: Droplet, title: "For Our Future Children" },
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
                  style={{ color: colors.secondary }} // Updated to use secondary color
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
        style={{ backgroundColor: colors.accent }} // Updated to use accent color
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Secure Payments Donation", image: "bamboo-toothbrush" },
              { title: "You Choose Who To Donate", image: "water-bottle" },
              { title: "Extensive Verification", image: "cotton-tote" },
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
                    "+"
                  )}`}
                  alt={product.title}
                  width={400}
                  height={300}
                  layout="responsive"
                />
                <div className="p-6">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: colors.primary }} // Updated to use primary color
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
                    style={{ backgroundColor: colors.secondary }} // Updated to use secondary color
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
        style={{ backgroundColor: colors.primary }} // Updated to use primary color
      >
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
          >
            Be a part of the Peduli Movement
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white mb-8 max-w-2xl mx-auto"
          >
            Subscribe to our newsletter for news, exclusive donation insight,
            and updates on our latest schools who need our help.
          </motion.p>
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space -y-0 md:space-x-4"
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
              style={{ backgroundColor: colors.accent }} // Updated to use accent color
            >
              Subscribe
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
