'use client';
import {  Sidebar,SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter } from "./sidebar";


export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}