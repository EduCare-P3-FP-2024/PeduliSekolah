"use client";
import { FC } from "react";
import Link from "next/link";
import {
  HomeIcon,
  ClipboardIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ComponentType, SVGProps } from "react";
import { LogOutIcon } from "lucide-react";

interface NavItem {
  href: string;
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

interface NavButtonProps {
  item: NavItem;
  isActive: boolean;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/admin", icon: HomeIcon },
  { name: "School List", href: "/admin/SchoolList", icon: ClipboardIcon },
  { name: "Post List", href: "/admin/ProjectList", icon: ClipboardIcon },
  { name: "Post Verify", href: "/admin/PostVerify", icon: CheckCircleIcon },
  { name: "Logout", href: "/login", icon: LogOutIcon },
];

const AdminSidebar: FC = () => {
  const pathname = usePathname();

  return (
    <div className="w-6/12 sm:w-3/12 p-5 hidden sm:block h-screen bg-white">
      <div className="bg-white rounded-xl">
        <nav className="space-y-4">
          {navItems.map((item) => (
            <NavButton
              key={item.name}
              item={item}
              isActive={pathname === item.href}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

const NavButton: FC<NavButtonProps> = ({ item, isActive }) => {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center space-x-2 rounded-full px-3 py-2 text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-white text-[#DE2F69] border-2 border-[#DE2F69]"
          : "text-gray-700 hover:bg-gray-200 hover:text-gray-900 border-2 border-transparent",
      )}
    >
      <item.icon
        className={cn(
          "h-5 w-5 transition-colors duration-200",
          isActive ? "text-[#DE2F69]" : "text-gray-700",
        )}
      />
      <span>{item.name}</span>
    </Link>
  );
};

export default AdminSidebar;
