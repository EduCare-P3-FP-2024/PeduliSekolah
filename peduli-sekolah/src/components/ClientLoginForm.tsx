'use client'

import { signIn, signOut } from "next-auth/react"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import PasswordInput from "@/components/PasswordInput"
import { actionLogin } from "@/app/login/action"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface User {
  email: string
  name?: string
  image?: string
}

export interface Session {
  user: User
  expires: string
}

interface LoginButtonProps {
  session: Session | null
  providers: { name: string; id: string }[]
}

export default function LoginForm({ session, providers }: LoginButtonProps) {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId)
    setIsModalOpen(false)
  }

  const handleSignIn = () => {
    if (selectedProvider) {
      signIn(selectedProvider)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      {!session ? (
        <>
          <form className="space-y-4 md:space-y-6 w-full mb-6" action={actionLogin}>
            <Input
              type="text"
              placeholder="Email"
              name="email"
              className="bg-[#ECF0F1] border-[#2C3E50]/20 text-[#34495E] placeholder-[#34495E]/60 focus:border-[#2C3E50] font-bold"
            />
            <PasswordInput name="password" />
            <Button
              className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white font-semibold py-3"
              type="submit"
            >
              Log In
            </Button>
          </form>

          <div className="mt-6 text-center text-[#ECF0F1]/80 font-semibold">
            Or Continue with
          </div>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-full bg-[#2C3E50]/10 border border-[#2C3E50]/20 text-[#ECF0F1] font-bold p-2 rounded-md flex justify-between items-center mt-4"
              >
                {selectedProvider
                  ? providers.find((p) => p.id === selectedProvider)?.name
                  : "Select a provider"}
                <ChevronDown className="ml-2" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#2C3E50] text-[#ECF0F1]">
              <DialogHeader>
                <DialogTitle>Select a provider</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                {providers.map((provider) => (
                  <Button
                    key={provider.id}
                    onClick={() => handleProviderSelect(provider.id)}
                    className={`w-full mb-2 justify-between ${
                      selectedProvider === provider.id
                        ? "bg-[#2C3E50]/30"
                        : "bg-[#2C3E50]/10"
                    } hover:bg-[#2C3E50]/20`}
                  >
                    {provider.name}
                    {selectedProvider === provider.id && (
                      <Check className="text-[#27AE60]" />
                    )}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {selectedProvider && (
            <Button
              onClick={handleSignIn}
              className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white font-semibold py-3 transition-colors duration-200 mt-4"
            >
              Sign in with {providers.find((p) => p.id === selectedProvider)?.name}
            </Button>
          )}
        </>
      ) : (
        <>
          <h1 className="text-[#34495E] text-lg font-semibold mb-4">
            Welcome, {session.user.email}
          </h1>
          <Button
            onClick={() => signOut()}
            className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white font-semibold py-3 transition-colors duration-200"
          >
            Sign out
          </Button>
        </>
      )}
    </div>
  )
}