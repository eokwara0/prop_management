"use client";
import { Button } from "@/shadcn/components/ui/button";
import {
  Arrow,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
  ChartBar,
  Dock,
  DraftingCompass,
  Inbox,
  LogOut,
  LucideLayoutDashboard,
  LucideProps,
  PanelLeft,
  Settings,
  User,
  Wallet,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import React, { useCallback } from "react";
import { createContext, useContext, useState } from "react";
import AppLogo from "@/assets/logo/icon2.png";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar } from "@/shadcn/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Session from "@/util/models/auth/session";
import IUser from "@/util/interfaces/iuser";
import { SideBarData } from "./sidebar.data";

const SIDEBAR_WIDTH = "3rem";

type SideBarContextType = {
  open: boolean;
  toggleSideBar: () => void;
  setOpen: (open: boolean) => void;
};

const SideBarContext = createContext<SideBarContextType | null>(null);

const useSideBarContext = () => {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("Please use this hook inside of it's provider");
  }
  return context;
};

export function SideBarProvider({
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const toggle = React.useCallback(() => {
    setOpen(!open);
  }, [setOpen, open]);

  const contextValue = React.useMemo<SideBarContextType>(() => {
    return {
      open: open,
      setOpen: setOpen,
      toggleSideBar: toggle,
    };
  }, [open, toggle, setOpen]);
  return (
    <SideBarContext.Provider value={contextValue} {...props}>
      <div className={`flex  min-h-svh ${className}`}>{children}</div>
    </SideBarContext.Provider>
  );
}

export function SideBarTrigger() {
  const { toggleSideBar } = useSideBarContext();

  return (
    <div>
      <Tooltip delayDuration={0} >
        <TooltipTrigger asChild className="p-2 cursor-pointer">
            <div className="h-6 flex justify-center items-center hover:bg-l-c bg-button rounded">
            <PanelLeft size={15} onClick={toggleSideBar} />
            </div>
        </TooltipTrigger>
        <TooltipContent sideOffset={20} align={"start"}>
          <Arrow />
          <p className=" rounded-md text-xs bg-button px-2 py-1 w-fit h-fit">
            Close panel
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export type SideBarDataType = {
    name : string
    icon : React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    href : string
    active: boolean
}

export function SideBar() {
  const { open } = useSideBarContext();
  const { data: session } = useSession();
  const [data , setData] = useState<SideBarDataType[]>(SideBarData)

  const onSideClick = useCallback((sidebarcontext : SideBarDataType) => {

    console.log(sidebarcontext);
    console.log(data)
    setData( data.map((c ) => {
        if(c.name === sidebarcontext.name){
            return sidebarcontext
        }
        return  {
            ...c,
            active : false
        };
    }));
  },[ data ])

  

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: SIDEBAR_WIDTH, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.1 }}
          style={{ overflow: "hidden" }}
        >
          <div
            className={` border-r-[1px] border-r-gray-500 flex flex-col justify-between items-center h-[100vh] p-2 transition-all duration-100 bg-gradient-to-br from-l_f_s to-l_f_f w-[${SIDEBAR_WIDTH}]`}
          >
            <div className="flex flex-col">
              <SideBarPanel>
                <SideBarHeader />
              </SideBarPanel>
              <div>
                {data.map((da) => (
                  <SideBarPanel key={da.name} active={da.active}>
                    <Tooltip>
                      <TooltipTrigger>
                        {
                          <Link
                            className={`cursor-pointer`}
                           href={da.href} onClick={() => onSideClick( {
                            ...da,
                            active : true,
                            
                          })} 
                          >
                            <da.icon
                              size={"1.3rem"}
                            />
                          </Link>
                        }
                      </TooltipTrigger>
                      <TooltipContent
                        className="bg-button p-2 rounded-md"
                        side="right"
                        sideOffset={20}
                      >
                        <Arrow width={10} height={5} className=" fill-button" />
                        <p className="text-xs">{da.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </SideBarPanel>
                ))}
              </div>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Settings className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  hideWhenDetached={true}
                  align="end"
                  alignOffset={200}
                  className=" flex flex-col gap-3 p-2 rounded-md w-48   shadow border-2 border-bc  backdrop-blur-2xl blur-in-2xl bg-gradient-to-r from-l_f_f to-l_f_s opacity-90 "
                  side="right"
                  sideOffset={20}
                >
                  <DropdownMenuItem
                    className="outline-none p-1 text-[1rem] rounded cursor-pointer hover:bg-button flex gap-2 justify-start items-center"
                    onClick={() => signOut()}
                  >
                    <LogOut width={15} height={15} />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SideBarPanel({
  children,
  className,
  active = false
}: {
  children: React.ReactNode;
  className?: string;
  active? : boolean ;
}) {
  return (
    <>
      <div
        className={` rounded-md p-2 ${active ? "bg-button" : "hover:bg-d-background"} w-fit flex justify-center items-center ${className}`}
      >
        {children}
      </div>
    </>
  );
}

export function SideBarHeader() {
  return (
    <div className="rounded-md bg-button p">
      <Image src={AppLogo} width={70} height={70} alt="" />
    </div>
  );
}

export function SideBarInset({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full min-h-full">{children}</div>
    </>
  );
}

export { useSideBarContext };
