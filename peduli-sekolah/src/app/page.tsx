import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="min-h-screen w-full bg-[#D9D9D9]">
        <Sidebar />
      </div>
    </>
  );
}
