"use server";

import { redirect } from "next/navigation";
import { hashPassword } from "@/utils/bcrypt";
import { z } from "zod";

export const RegisteLogic = async (formData: FormData) => {
  type GenericResponse<Type> = {
    statusCode: number;
    message?: string;
    data?: Type;
    error?: string;
  };

  const registerInput = z.object({
    username: z.string({ message: "Username is required" }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Must be in email format" }),
    password: z.string({ message: "Password is required" }),
  });

  const response = await fetch("http://localhost:3000/api/register", {
    method: "POST",
    body: JSON.stringify({
      username: formData.get("username"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      password: formData.get("password"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseJson: GenericResponse<unknown> = await response.json();

  if (!response.ok) {
    let message = responseJson.error;

    return redirect(`/register?error=${message}`);
  }
  return redirect("/login");
};
