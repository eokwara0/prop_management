import { AppSidebar } from "@/shadcn/components/app-sidebar";
import { TooltipProvider } from "@/shadcn/components/ui/tooltip";
import { AppHeader } from "@/util/components/nav/app.header/app.header";
import AppNav from "@/util/components/nav/app.nav";
import { SideBar, SideBarInset, SideBarProvider, SideBarTrigger } from "@/util/components/nav/sidebar/sidebar.provider";
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
      // <SidebarProvider>
      //   <AppSidebar />
      //   <SidebarInset>
      //      <div className="h-[4vh]">
      //       <AppNav/>

      //      </div>
      //      <div className="h-[96vh]">
      //       {children}
      //      </div>
      //   </SidebarInset>
      // </SidebarProvider>
      <SideBarProvider>
        <TooltipProvider delayDuration={0} data-slot="tooltip-provider">
          <SideBar />
          <SideBarInset>
            <AppHeader/>
            {/* <SideBarTrigger /> */}
            {children}
          </SideBarInset>
        </TooltipProvider>

      </SideBarProvider>
    );
  }
  redirect("/");
}
