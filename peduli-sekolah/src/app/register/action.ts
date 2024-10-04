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

  const validatedFields = registerInput.safeParse(rawData);

  if (!validatedFields.success) {
    const errorPath = validatedFields.error.issues[0].path[0];
    const errorMessage = validatedFields.error.issues[0].message;

    return redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/register?error=${encodeURIComponent(
        `${errorPath}: ${errorMessage}`
      )}`
    );
  }

  let check;

  try {
    const role = "user";
    const phoneNumberValue = validatedFields.data.phoneNumber || "";

    // User data for DB insertion
    const userDataForNewUser = {
      username: validatedFields.data.username,
      email: validatedFields.data.email,
      phone_number: phoneNumberValue,
      password: validatedFields.data.password,
      account_type: validatedFields.data.accountType,
      role: role,
    };

    await createUser(userDataForNewUser);

    return check = true;
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return redirect(
        `/register?error=Validation%20error:%20${encodeURIComponent(
          firstError.message
        )}`
      );
    }

    return redirect(
      `/register?error=Server%20Error:%20Please%20try%20again%20later`
    );
  }

  if (check) {
    return redirect(`/login`);
  }
};
