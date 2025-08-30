import { isValidUser } from "@/util/util/client.functions";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Domio",
  description: "A platform for managing your home's",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    console.log(await isValidUser());
  return <>{await isValidUser() ? redirect("/app") : children}</>;
}
