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
          placeholder="Email"
          name="email"
          className="bg-[#ECF0F1] border-[#2C3E50]/20 text-[#34495E] placeholder-[#34495E]/60 focus:border-[#2C3E50] font-bold"
        />
      </div>
      <PasswordInput name="password" />
      <Button
        className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white font-semibold py-3"
        type="submit"
      >
        Log In
      </Button>
    </form>
  );
}
