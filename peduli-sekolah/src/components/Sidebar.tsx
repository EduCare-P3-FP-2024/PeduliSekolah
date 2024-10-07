"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UserIcon,
  ChatBubbleOvalLeftIcon,
  EnvelopeIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import logoPs from "@/assets/logo.png";
import profilePicture from "@/assets/tempestus2.jpg";

type NavItem = {
  name: string;
  href: string;
  icon: typeof HomeIcon;
};

const navItems: NavItem[] = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Schools", href: "/schools", icon: AcademicCapIcon },
  { name: "Profile", href: "/profile", icon: UserIcon },
  { name: "Post", href: "/post", icon: ChatBubbleOvalLeftIcon },
  { name: "Own Post", href: "/own-post", icon: EnvelopeIcon },
];

export default function Sidebar() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  if (
    pathname === "/admin" ||
    pathname === "/admin/SchoolList" ||
    pathname === "/admin/ProjectList" ||
    pathname === "/admin/PostVerify" ||
    pathname === "/login"
  ) {
    return <div className="hidden"></div>;
  }

  setTimeout(() => setIsLoading(false), 2000);

  return (
    <div className="flex h-screen w-64 flex-col justify-between border-r border-[#E67E22] bg-[#ECF0F1] p-4">
      <div>
        <div className="mb-8">
          {isLoading ? (
            <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
          ) : (
            <Image src={logoPs} alt="PS Logo" width={50} height={50} />
          )}
        </div>

        <nav className="space-y-4">
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-10 w-full animate-pulse rounded-md bg-gray-200"
                  />
                ))
            : navItems.map((item) => (
                <NavButton
                  key={item.name}
                  item={item}
                  isActive={pathname === item.href}
                />
              ))}
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        {isLoading ? (
          <div className="flex w-full items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
            <div className="flex-1 h-4 rounded bg-gray-200 animate-pulse" />
          </div>
        ) : (
          <>
            <Image
              src={profilePicture}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-sm font-medium text-[#34495E]">John Doe</span>
            <button className="ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-[#34495E]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function NavButton({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center space-x-2 rounded-full px-3 py-2 text-sm font-medium", // Removed transition
        isActive
          ? "bg-[#2C3E50] text-[#E67E22] border-2 border-[#E67E22]" // Active state: Orange text, Navy background, border
          : "text-[#34495E] hover:bg-[#E67E22] hover:text-white border-2 border-transparent" // Idle & Hover state: Dark Gray text with hover effects
      )}
    >
      <item.icon
        className={cn(
          "h-5 w-5", // Removed transition
          isActive ? "text-[#E67E22]" : "text-[#34495E]" // Active: Orange, Idle: Dark Gray
        )}
      />
      <span>{item.name}</span>
    </Link>
  );
}
