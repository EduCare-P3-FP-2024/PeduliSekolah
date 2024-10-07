import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.MIDTRANS_CLIENT_kEY}
      ></Script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Flex container for sidebar and main content */}
        <div className="flex min-h-screen">
          {/* Sidebar */}
          {/* <Sidebar /> */}

          {/* Main content area with padding to account for the sidebar */}
          <main className="flex-1 flex items-center justify-center">
            {children}
            <Toaster/>
          </main>
        </div>
      </body>
    </html>
  );
}
