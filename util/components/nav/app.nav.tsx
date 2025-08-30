"use client";
import { SidebarTrigger } from "@/shadcn/components/ui/sidebar";
import { Notification } from "./notification/notification";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/components/ui/avatar";
import { Chats } from "./chats/chats";

export default function AppNav() {
  return (
    <div className="w-full bg-gradient-to-r from-d-background to-s-background flex justify-between items-center px-4 py-2">
      <div>
        <SidebarTrigger />
      </div>
      <div className="flex gap-3 justify-center items-center">
        <Chats/>
        <Notification />
        <Avatar >
          <AvatarImage width={5} height={5}  src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
