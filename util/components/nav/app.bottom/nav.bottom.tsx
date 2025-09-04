"use client";
import React from "react";
import { IoNotifications } from "react-icons/io5";

export function BottomNav() {
  return <div className="w-full h-[2.3svh] bg-gradient-to-r from-l_f_f to-l_f_s border-t border-t-bc">
    <BottomNavSection>
            <div className="size-4 cursor-pointer flex justify-center items-center hover:bg-slate-400 rounded-full">
                <IoNotifications size={14}/>
            </div>
    </BottomNavSection>
  </div>;
}

export function BottomNavSection({
  children,
}: {
  children?: React.ReactNode;
}) {

    return (
        <div className="h-full flex px-1  items-center">
            {children}
        </div>
    )
}
