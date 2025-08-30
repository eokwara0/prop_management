import { isValidUser } from "@/util/util/client.functions";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await isValidUser();
  if (data) {
    return (
      <main className=" text-white bg-gradient-to-br from-l_f_s to-l_f_f min-h-screen ">
        {children}
      </main>
    );
  }
  redirect("/");
}
