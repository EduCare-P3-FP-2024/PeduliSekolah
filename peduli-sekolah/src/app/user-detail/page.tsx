"use client";

import { useState } from "react";
import profilePicture from "@/assets/tempestus2.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function UserProfile() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState({
    username: "johndoe",
    email: "johndoe@mail.com",
    phoneNumber: "081234567890",
  });

  const handleLogout = () => {
    router.push("/landing-page");
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedUser = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
    };
    setUser(updatedUser);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#ECF0F1] flex flex-col text-[#34495E]">
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="relative w-32 h-32 mb-4 sm:mb-0 sm:mr-8">
              <Image
                src={profilePicture}
                alt="Profile picture"
                layout="fill"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#E67E22] hover:bg-[#D35400] text-white">
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSave}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Username
                        </Label>
                        <Input
                          id="username"
                          name="username"
                          defaultValue={user.username}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          defaultValue={user.email}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phoneNumber" className="text-right">
                          Phone Number
                        </Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          defaultValue={user.phoneNumber}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        className="bg-[#E67E22] hover:bg-[#D35400] text-white"
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-[#2C3E50] text-[#2C3E50] hover:bg-[#2C3E50] hover:text-white"
                  >
                    Logout
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to logout?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will log you out of your account. You will
                      need to log in again to access your profile.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-[#ECF0F1] text-[#34495E] hover:bg-[#BDC3C7]">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLogout}
                      className="bg-[#E67E22] hover:bg-[#D35400] text-white"
                    >
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <div className="p-3 bg-[#ECF0F1] rounded-md text-lg">
                @{user.username}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="p-3 bg-[#ECF0F1] rounded-md text-lg">
                {user.email}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <div className="p-3 bg-[#ECF0F1] rounded-md text-lg">
                {user.phoneNumber}
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="bg-[#E67E22] hover:bg-[#D35400] text-white">
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
