"use client"; // This indicates that this component is a Client Component

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/PasswordInput";
import Link from "next/link";
import { signIn } from "next-auth/react"; // Import signIn from NextAuth
import ClientFlashComponent from "@/components/ClientFlashComponent";

interface Provider {
  id: string;
  name: string;
}

interface LoginFormProps {
  providers: Record<string, Provider>; // Adjust this according to how you're getting providers
  actionLogin: string; // Assuming actionLogin is a string, change it if it's another type
}

export default function LoginForm({ providers, actionLogin }: LoginFormProps) {
  return (
    <div className="w-full md:w-1/2 bg-[#BA2758] p-8 md:p-12 flex flex-col justify-center">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">PeduliSekolah.</h1>
      <p className="text-base md:text-lg text-white mb-6 md:mb-8 font-medium">to help those in need</p>
      <ClientFlashComponent />
      <form className="space-y-4 md:space-y-6" action={actionLogin}>
        <div>
          <Input
            type="text"
            placeholder="email"
            name="email"
            className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white font-bold"
          />
        </div>
        <PasswordInput name="password" />
        <Button
          className="w-full bg-[#9D1C44] hover:bg-[#7D1636] text-white font-semibold py-3"
          type="submit"
        >
          Log In
        </Button>
      </form>
      <div className="mt-6 text-center text-white/80 font-semibold">Or Continue with</div>
      {Object.values(providers || {}).map((provider) => (
        <Button
          key={provider.id}
          variant="outline"
          className="mt-4 w-full bg-transparent text-white border-white/20 hover:bg-white/10 font-semibold"
          onClick={() => signIn(provider.id)}
        >
          Continue with {provider.name}
        </Button>
      ))}
      <div className="mt-4 text-center text-white text-sm">
        Don't have an account?{" "}
        <Link href="/register" className="font-semibold hover:underline hover:text-white/80">
          Register Now
        </Link>
      </div>
    </div>
  );
}
