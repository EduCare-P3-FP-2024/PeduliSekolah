"use client";

import React, { ReactNode } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Link from "next/link";

interface FadeInWhenVisibleProps {
  children: ReactNode;
}

const FadeInWhenVisible = ({ children }: FadeInWhenVisibleProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default function HeroLandingPage() {
  return (
    <div className="container mx-auto px-4">
      <FadeInWhenVisible>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#ECF0F1]">
          Empowering Low-Funded Schools
        </h1>
        <p className="text-xl mb-8 max-w-2xl text-[#ECF0F1]">
          Join us in our mission to provide essential materials and funds to
          schools in need. Together, we can create equal educational
          opportunities for all.
        </p>
        <div className="flex space-x-4">
          <Link
            href="#"
            className="bg-[#E67E22] text-[#ECF0F1] px-6 py-3 rounded-md hover:bg-[#27AE60] transition-colors duration-300"
          >
            Sign Up Now
          </Link>
          <Link
            href="#"
            className="bg-transparent border border-[#ECF0F1] text-[#ECF0F1] px-6 py-3 rounded-md hover:bg-[#ECF0F1] hover:text-[#2C3E50] transition-colors duration-300"
          >
            Learn More
          </Link>
        </div>
      </FadeInWhenVisible>
    </div>
  );
}
