"use server";

import { getUserByEmail } from "@/db/models/user";
import { comparePassword } from "@/utils/bcrypt";
import { createTokenJose } from "@/utils/jose";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";

export const loginLogic = async (formData: FormData) => {
  const loginInput = z.object({
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Must be in email format" }),
    password: z.string({ message: "Password is required" }),
  });

  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  console.log("====== ini rawdata dari login ======", rawData);

  const parsingData = loginInput.safeParse(rawData);

  console.log("===== ini data parsing dari login =====", parsingData);

  if (!parsingData.success) {
    const errorPath = parsingData.error.issues[0].path[0];
    const errorMessage = parsingData.error.issues[0].message;
    const finalError = `${errorPath} - ${errorMessage}`;

    return redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/login?error=${finalError}`
    );
  }

  const userData = await getUserByEmail(parsingData.data.email);
  console.log(
    "===== ini data get userByEmail dari action login =====",
    userData
  );

  if (
    !userData ||
    !comparePassword(parsingData.data.password, userData.password)
  ) {
    return redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/login?error=Invalid%20credentials`
    );
  }

  const payload = {
    id: userData._id,
    email: userData.email,
  };

  console.log("===== ini data token dari action login =====", payload);

  const token = await createTokenJose(payload);

  console.log("===== ini token hasil dari action login =====", token);

  cookies().set("token", token, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    sameSite: "strict",
  });

  return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`);
};
