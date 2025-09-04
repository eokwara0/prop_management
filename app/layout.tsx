import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import BannerProvider from "@/util/components/context/banner/banner.provider";
import { SessionProvider } from "next-auth/react";

const silkScreen = Lexend_Deca({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Domio",
  description: "A platform for managing your home's",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${silkScreen.className} antialiased`}>
        <SessionProvider>
          <BannerProvider>{children}</BannerProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
