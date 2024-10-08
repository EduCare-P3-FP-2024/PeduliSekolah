"use client";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface PageProps {
  params: { id: string };
}

const Page: React.FC<PageProps> = ({ params }) => {
  console.log(params);

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();

  async function handleCaptchaSubmission(token: string | null) {
    try {
      if (token) {
        await fetch("/api/capcha", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        router.push("/login");
        setIsVerified(true);
      }
    } catch (e) {
      setIsVerified(false);
    }
  }

  const handleChange = (token: string | null) => {
    handleCaptchaSubmission(token);
  };

  function handleExpired() {
    setIsVerified(false);
  }

  return (
    <main className="flex flex-col items-center mt-10 gap-3 ">
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
        ref={recaptchaRef}
        onChange={handleChange}
        onExpired={handleExpired}
      />
      <button
        className="border-solid border-1 border-gray-300 rounded-md p-2 bg-blue-500 text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        type="submit"
        disabled={!isVerified}
      >
        Submit Form
      </button>
    </main>
  );
};

export default Page;
