import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";

const silkScreen = Lexend_Deca({
  subsets : ['latin'],
  weight : '400'
});


export const metadata: Metadata = {
  title: "Domio",
  description: "A platform for managing your home's",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${silkScreen.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
