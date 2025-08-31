import { TooltipProvider } from "@/shadcn/components/ui/tooltip";
import { AppHeader } from "@/util/components/nav/app.header/app.header";
import { SideBar, SideBarInset, SideBarProvider } from "@/util/components/nav/sidebar/sidebar.provider";
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
      <SideBarProvider>
        <TooltipProvider delayDuration={0} data-slot="tooltip-provider">
          <SideBar />
          <SideBarInset>
            <AppHeader/>
            {children}
          </SideBarInset>
        </TooltipProvider>

      </SideBarProvider>
    );
  }
  redirect("/");
}
