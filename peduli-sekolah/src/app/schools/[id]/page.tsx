"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { School, Phone, User, Users } from "lucide-react";
import { ObjectId } from "mongodb";

const colors = {
  primary: "#BA2758",
  secondary: "#BA2758",
  accent: "##BA2758",
  background: "#fff",
};

const SchoolDetailPage = ({ params }: { params: { _id: ObjectId } }) => {
  const [isClient, setIsClient] = useState(false);
  console.log(params._id);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div
      className="flex flex-grow min-h-screen bg-background"
      style={{ backgroundColor: colors.background }}
    >
      <div className="flex flex-col flex-grow p-8">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center justify-center flex-grow"
        >
          <div className="text-center">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ color: colors.primary }}
            >
              School Details
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl"
            >
              {[
                {
                  icon: School,
                  label: "School Name",
                  value: "Greenwood High School",
                },
                { icon: Phone, label: "Phone Number", value: "(123) 456-7890" },
                { icon: User, label: "Principal", value: "John Doe" },
                { icon: Users, label: "Number of Students", value: "1,234" },
              ].map((detail, index) => (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="flex items-center p-4 rounded-lg border border-gray-200"
                >
                  <detail.icon
                    className="w-12 h-12 mr-4"
                    style={{ color: colors.secondary }}
                  />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      {detail.label}
                    </h3>
                    <p className="text-gray-600">{detail.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default SchoolDetailPage;
