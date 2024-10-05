"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/PasswordInput";
import { actionLogin } from "@/app/login/action";

export default function ClientLoginForm() {
  return (
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
  );
}
