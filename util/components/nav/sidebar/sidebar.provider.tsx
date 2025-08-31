"use client";
import { Button } from "@/shadcn/components/ui/button";
import { Arrow, Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { ChartBar, Dock, DraftingCompass, Group, Inbox, LayoutDashboard, PanelLeft, Settings, User, Wallet, Wrench } from "lucide-react";
import Image from "next/image";
import React from "react";
import { createContext, useContext, useState } from "react"
import AppLogo from "@/assets/logo/icon2.png";
import * as motion from "motion/react-client"
import { AnimatePresence } from "motion/react";



const SIDEBAR_WIDTH = '3rem';

type SideBarContextType = {
    open: boolean;
    toggleSideBar: () => void
    setOpen: (open: boolean) => void

}


const SideBarContext = createContext<SideBarContextType | null>(null);

const useSideBarContext = () => {
    const context = useContext(SideBarContext);
    if (!context) {
        throw new Error("Please use this hook inside of it's provider");
    }
    return context;
}


export function SideBarProvider({
    className,
    children,
    ...props
}: React.ComponentProps<"div"> & {
    children: React.ReactNode,
}) {
    const [open, setOpen] = useState<boolean>(true);
    const toggle = React.useCallback(() => {
        setOpen(!open)
    }, [setOpen, open])

    const contextValue = React.useMemo<SideBarContextType>(() => {
        return {
            open: open,
            setOpen: setOpen,
            toggleSideBar: toggle
        }
    }, [open, toggle, setOpen])
    return (
        <SideBarContext.Provider value={contextValue} {...props}>
            <div className={`flex  min-h-svh ${className}`}>
                {children}
            </div>
        </SideBarContext.Provider>
    );

}



export function SideBarTrigger() {

    const { toggleSideBar } = useSideBarContext();

    return (
        <div>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild className="p-2">
                    <Button onClick={() => toggleSideBar()} className="w-fit h-fit">
                        <PanelLeft />
                    </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={20} >
                    <Arrow />
                    <p className=" rounded-md text-xs bg-black px-2 py-1 w-fit h-fit">Close panel</p>
                </TooltipContent>
            </Tooltip>

        </div>
    )

}

export function SideBar() {
    const { open } = useSideBarContext();

    const data = [
        {
            name: "Properties",
            icon: Inbox,
            href: "#"
        },
        {
            name: "Units",
            icon: DraftingCompass,
            href: "#"
        }, {
            name: "Tenants",
            icon: User,
            href: "#"
        }, {
            name: "Leases",
            icon: Dock,
            href: "#"
        },
        {
            name: "Payments",
            icon: Wallet,
            href: "#"
        },
        {
            name: "Maintenance",
            icon: Wrench,
            href: "#"
        },
        {
            name: "Reports",
            icon: ChartBar,
            href: "#"
        },
        {
            name: "Settings",
            icon: Settings,
            href: "#"
        }
    ];

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
                    <div className={` border-r-[1px] border-r-gray-500 flex flex-col justify-start items-center h-[100vh] p-2 transition-all duration-100 bg-gradient-to-br from-l_f_s to-l_f_f w-[${SIDEBAR_WIDTH}]`}>
                        <SideBarPanel>
                            <SideBarHeader />
                        </SideBarPanel>
                        <div>
                            {data.map((da) => (
                                <SideBarPanel key={da.name}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            {<da.icon size={"1.3rem"} className="cursor-pointer" />}
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-button p-2 rounded-md" side="right" sideOffset={20}>
                                            <Arrow width={10} height={5} className=" fill-button" />
                                            <p className="text-xs">
                                                {da.name}
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </SideBarPanel>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export function SideBarPanel({ children, className }: { children: React.ReactNode, className?: string }) {
    return <>
        <div className={` rounded-md p-2 hover:bg-d-background w-[40px] flex justify-center items-center ${className}`}>
            {children}
        </div>
    </>
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
            <div className="w-full min-h-full">
                {children}
            </div>
        </>
    );
}

export {
    useSideBarContext
}