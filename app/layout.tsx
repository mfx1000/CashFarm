import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// FIXED: The correct provider name is WhopIframeSdkProvider
import { WhopIframeSdkProvider } from "@whop/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coin Flip Royale",
  description: "High-stakes coin flip tournaments on Whop.",
};

// The props structure is slightly different in Next.js 14
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* FIXED: Use the correct component name here as well */}
        <WhopIframeSdkProvider>{children}</WhopIframeSdkProvider>
      </body>
    </html>
  );
}
