import { TooltipProvider } from "@/shadcn/components/ui/tooltip";
import { auth } from "@/util/auth";
import { AppAuthContextProvider } from "@/util/auth/auth.provider";
import { BottomNav } from "@/util/components/nav/app.bottom/nav.bottom";
import { AppHeader } from "@/util/components/nav/app.header/app.header";
import {
  SideBar,
  SideBarInset,
  SideBarProvider,
} from "@/util/components/nav/sidebar/sidebar.provider";
import { redirect } from "next/navigation";
import './index.css'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = (await auth())?.user?.id;
  console.log('hi')
  if (userId) {
    return (
      <div className="min-h-dvh ">
        <AppAuthContextProvider data={userId}>
          <SideBarProvider>
            <TooltipProvider delayDuration={0} data-slot="tooltip-provider">
              <SideBar />
              <SideBarInset>
                <AppHeader />
                <div className=" h-[94.5%] max-md:h-[100%] overflow-y-auto scrollbar-hidden">{children}</div>
                <BottomNav></BottomNav>
              </SideBarInset>
            </TooltipProvider>
          </SideBarProvider>
        </AppAuthContextProvider>
      </div>
    );
  }
  redirect("/");
}
