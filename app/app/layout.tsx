import { AppSidebar } from "@/shadcn/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shadcn/components/ui/sidebar";
import AppNav from "@/util/components/nav/app.nav";
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
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
           <div className="h-[4vh]">
            <AppNav/>

           </div>
           <div className="h-[96vh]">
            {children}
           </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }
  redirect("/");
}
