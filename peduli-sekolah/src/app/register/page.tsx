"use server";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import giftBg from "@/assets/givingbg.jpg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PasswordInput from "@/components/PasswordInput";

import { RegisterLogic } from "./action"; // Importing the registration logic
import { Label } from "@/components/ui/label";
import { Suspense } from "react";
import ClientFlashComponent from "@/components/ClientFlashComponent";

export default async function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#D9D9D9] flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl overflow-hidden rounded-3xl shadow-lg">
        <CardContent className="p-0 flex">
          <div className="w-1/2 relative">
            <Image
              src={giftBg}
              alt="Gift boxes"
              width={500}
              height={600}
              className="object-cover h-full"
            />
          </div>
          <div className="w-1/2 bg-[#911F45] p-8 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white mb-2">Register</h1>
            <p className="text-lg text-white/80 mb-8 font-medium italic">
              Join us and be a part of something greater
            </p>

            {/* Form submission is linked to the RegisterLogic */}
            <Suspense>
              <ClientFlashComponent />
            </Suspense>
            <form className="space-y-6" action={RegisterLogic}>
              <div>
                <Label htmlFor="username" className="text-white">
                  Username *:
                </Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white font-bold"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">
                  Email *:
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white font-bold"
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber" className="text-white">
                  Phone Number:
                </Label>
                <Input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white font-bold"
                />
              </div>
              <div>
                <Label htmlFor="accountType" className="text-white">
                  Purpose *:
                </Label>
                <Select name="accountType">
                  <SelectTrigger className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white font-bold">
                    <SelectValue placeholder="Select type" id="accountType" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Personal</SelectItem>
                    <SelectItem value="school">School</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="password" className="text-white">
                  Password *:
                </Label>
                <PasswordInput name="password" />
              </div>
              <Button
                className="w-full text-white font-semibold py-6 rounded-xl bg-gradient-to-r from-[#CF2B61] from-40% to-[#691631] hover:shadow-lg transition-shadow"
                type="submit"
              >
                Register
              </Button>
              <p className="text-sm italic opacity-50">* = Required</p>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
