"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/shadcn/components/ui/drawer";
import { signOut } from "next-auth/react";
import {
  SideBarDataType,
  SideBarHeader,
  SideBarPanel,
  useSideBarContext,
} from "./sidebar.provider";
import { LogOut, LucideLogOut } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/shadcn/components/ui/sheet";
import { useCallback } from "react";
import React from "react";

export function NavDrawer({ sdata }: { sdata: SideBarDataType[] }) {
  const { toggleSideBar, open } = useSideBarContext();
  const [ss_data , setData] = React.useState<SideBarDataType[]>(sdata)
  const onSideClick = useCallback(
      (sidebarcontext: SideBarDataType) => {
        setData(
          ss_data.map((c) => {
            if (c.name === sidebarcontext.name) {
              localStorage.setItem("side-bar", JSON.stringify(sidebarcontext));
              return sidebarcontext;
            }
            return {
              ...c,
              active: false,
            };
          })
        );
      },
      [ss_data]
    );
  return (
    <>
      {/* {MobileSideNav(open, toggleSideBar, sdata)} */}
      <Sheet open={true} modal={false}>
        <SheetContent

          className=" h-fit bg-transparent flex justify-center items-center  w-full border-none p-2"
          side="bottom"
          onInteractOutside={toggleSideBar}
        >
          <SheetHeader className="hidden">
            <SheetTitle></SheetTitle>
          </SheetHeader>
          <div className=" backdrop-blur-xs bg-gradient-to-br from-mn to-mn w-fit rounded-xl shadow-sm shadow-black/50 inset-shadow-2xs inset-shadow-muted/40 ring-1 ring-muted/60">
            <div className="flex gap-2 justify-center p-2 items-center">
              {ss_data.map((c) => {
                return (
                  <a href={c.href} key={`sheet${c.name}`}>
                    <SideBarPanel 
                        onClick={() => onSideClick(c)}
                      active={c.active}
                      className=" cursor-pointer h-fit flex gap-2 p-2 justify-start items-center"
                    >
                      <c.icon size={20} />
                      {/* {c.active ? (
                    <p className="text-xs font-medium">{c.name}</p>
                  ) : (
                    <span className="hidden"></span>
                  )} */}
                    </SideBarPanel>
                  </a>
                );
              })}
            </div>

                <SheetClose className=" hidden"/>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
function MobileSideNav(
  open: boolean,
  toggleSideBar: () => void,
  sdata: SideBarDataType[]
) {
  return (
    <Drawer open={open} direction="left" modal={false} noBodyStyles>
      <DrawerContent
        onInteractOutside={toggleSideBar}
        style={{ minWidth: 200, width: 200, padding: 10 }}
        className=" text-white bg-gradient-to-br from-l_f_f to-l_f_s"
      >
        <div className=" w-full max-w-sm flex flex-col justify-between h-full">
          <div>
            <DrawerHeader className=" ring ring-muted/10 p-1.5 rounded-md">
              <div className="flex items-center gap-2 w-fit">
                <DrawerTitle className="flex gap-2 text-sm items-center text-white font-light">
                  <SideBarHeader height={20} width={20} />
                  <p>Domio</p>
                </DrawerTitle>

                {/* <Avatar className=" bg-gradient-to-tr from-l_f_f to-l_f_s text-white">
          <AvatarImage />
          <AvatarFallback className="bg-gradient-to-tl from-l_f_f to-l_f_s border-2 border-slate-50">
            {`${userData.data?.user?.name![0].toUpperCase()}`}
          </AvatarFallback>
        </Avatar> */}
                {/* <div>
          <DrawerTitle className="text-white font-light text-">
            {userData.data?.user?.name?.toWellFormed()}
          </DrawerTitle>
          <DrawerDescription className="text-xs">
            {/* {userData.data?.user?.email} */}
                {/* </DrawerDescription> */}
                {/* </div> */}
              </div>
            </DrawerHeader>
            <div className="flex flex-col gap-2">
              {sdata.map((c) => {
                return (
                  <a href={c.href} key={`drawer${c.name}`}>
                    <SideBarPanel
                      active={c.active}
                      className={`text-sm px-2 py-2 w-full flex justify-start ${
                        c.active
                          ? "shadow-md/50 shadow-black/50 inset-shadow-2xs inset-shadow-muted/40"
                          : ""
                      }`}
                    >
                      <div className="flex gap-2 justify-start items-center">
                        <c.icon size={20} />
                        <p className="text-xs">{c.name}</p>
                      </div>
                    </SideBarPanel>
                  </a>
                );
              })}
            </div>
          </div>
          <SideBarPanel
            active
            className="w-full py-1 justify-start cursor-pointer shadow-md/50 shadow-black/50 inset-shadow-2xs inset-shadow-muted/40"
            onClick={() => {
              signOut();
            }}
          >
            <div className="flex items-center gap-2">
              <LucideLogOut size={20} />
              <div className="text-sm">Logout</div>
            </div>
          </SideBarPanel>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
