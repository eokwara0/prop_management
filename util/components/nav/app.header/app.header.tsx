'use client'
import { Badge } from "@/shadcn/components/ui/badge";
import { SideBarTrigger } from "../sidebar/sidebar.provider";
import { Search } from "lucide-react";

export function AppHeader() {
  
  return (
    <div className=" shadow bg-gradient-to-r border-b border-b-slate-400 from-l_f_s to-l_f_f p-5 w-full h-[4svh] flex justify-between items-center">
      <div>
        <div className="flex gap-3 justify-center items-center">
          <SideBarTrigger />
          <Badge className="bg-button">Dashboard</Badge>
        </div>

        
        
      </div>
      <div className="max-sm:hidden">
        <div>
          <form action="">
            <label htmlFor="search" className="flex h-7 px-2 items-center gap border border-slate-300 rounded-md">
                <Search size={17} className="cursor-pointer"/>
                <input 
              type="text" 
              name="search"
              id="search"
              placeholder="Search for data" 
              className="bg-slate w-fit text-sm p-3 rounded-md outline-none" />
            </label>
            
          </form>
        </div>
      </div>

      <div>Info</div>
    </div>
  );
}
