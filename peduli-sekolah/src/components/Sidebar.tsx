"use client";

import { useState } from "react";
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
    pathname === "/admin/PostVerify"
  ) {
    return <div className="hidden"></div>;
  }

  setTimeout(() => setIsLoading(false), 2000);

  return (
    <div className="flex h-screen w-64 flex-col justify-between border-r border-[#BA2758] bg-white p-4">
      <div>
        <div className="mb-8">
          <Image
            src={logoPs}
            alt="PS Logo"
            width={50}
            height={50}
          />
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
      {!isLoading && (
        <div className="flex items-center space-x-4">
          <Image
            src={profilePicture}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-sm font-medium">John Doe</span>
          <button className="ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

function NavButton({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-[#DE2F69] text-white"
          : "text-gray-600 hover:bg-[#D9D9D9] hover:text-gray-900",
      )}
    >
      <item.icon className="h-5 w-5" />
      <span>{item.name}</span>
    </Link>
  );
}
