"use server";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/PasswordInput";
import Link from "next/link";
import studentBg from "@/assets/studentbg.jpg";
import { actionLogin } from "./action";
import ClientFlashComponent from "@/components/ClientFlashComponent";
import { Suspense } from "react";

export default async function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F0F4F9] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[600px] bg-white rounded-xl overflow-hidden shadow-2xl flex">
        <div className="w-1/2 bg-[#BA2758] p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white mb-2">PeduliSekolah.</h1>
          <p className="text-lg text-white mb-8 font-medium">
            to help those in need
          </p>
          <Suspense>
            <ClientFlashComponent />
          </Suspense>
          <form className="space-y-6" action={actionLogin}>
            <div>
              <Input
                type="email"
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
          <div className="mt-6 text-center text-white/80 font-semibold">
            Or Continue with
          </div>
          <Button
            variant="outline"
            className="mt-4 w-full bg-transparent text-white border-white/20 hover:bg-white/10 font-semibold"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
              />
            </svg>
            Continue with Google
          </Button>
          <div className="mt-4 text-center text-white text-sm">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold hover:underline hover:text-white/80"
            >
              Register Now
            </Link>
          </div>
        </div>
        <div className="w-1/2 relative">
          <Image
            src={studentBg}
            alt="Classroom"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}
