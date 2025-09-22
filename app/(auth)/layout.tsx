import { auth } from "@/util/auth";
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
  const userId = (await auth())?.user?.id
  return <>{ userId ? redirect(`/app/${userId}`) : children}</>;
}
