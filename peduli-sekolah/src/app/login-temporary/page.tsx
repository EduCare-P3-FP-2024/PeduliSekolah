// app/page.tsx
import { getServerSession } from "next-auth/next";
import { getProviders } from "next-auth/react";
import LoginButton from "@/components/LoginButton";
import React from "react";
import { Session } from "@/components/LoginButton"; // Adjust the path as needed
import authOptions from "../api/auth/authOption"; // Import from the new file

export default async function Home() {
  const session: Session | null = await getServerSession(authOptions);
  const providers = await getProviders();

  return (
    <div>
      <LoginButton session={session} providers={Object.values(providers || {})} />
    </div>
  );
}
