"use server";

import { redirect } from "next/navigation";
import { createUser } from "@/db/models/user";
import { z } from "zod";

export const RegisterLogic = async (formData: FormData) => {
  const registerInput = z.object({
    username: z.string({ message: "Username is required" }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Must be in email format" }),
    phoneNumber: z.string().optional(),
    password: z
      .string({ message: "Password is required" })
      .min(5, { message: "Password must be at least 5 characters" }),
    accountType: z.enum(["individual", "school"], {
      errorMap: () => ({ message: "Please select an account type" }),
    }),
  });

  const rawData = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    phoneNumber: formData.get("phoneNumber"),
    accountType: formData.get("accountType"),
  };

  console.log("===== ini rawData dari action register =====", rawData);

  const validatedFields = registerInput.safeParse(rawData);

  if (!validatedFields.success) {
    const errorPath = validatedFields.error.issues[0].path[0];
    const errorMessage = validatedFields.error.issues[0].message;

    return redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/register?error=${encodeURIComponent(
        `${errorPath} - ${errorMessage}`
      )}`
    );
  }

  try {
    const role = "user";

    const phoneNumberValue = validatedFields.data.phoneNumber || "";

    const userDataForNewUser = {
      username: validatedFields.data.username,
      email: validatedFields.data.email,
      phone_number: phoneNumberValue,
      password: validatedFields.data.password,
      role: role,
    };

    const result = await createUser(userDataForNewUser);
    console.log(
      "==== ini data user baru register dari action register ====",
      result
    );

    return redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/login?success=Register%20Success`
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return redirect(`/register?error=${firstError.message}`);
    }
    return redirect(`/register?error=${"Internal Server Error"}`);
  }
};
