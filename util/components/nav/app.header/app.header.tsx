import { Badge } from "@/shadcn/components/ui/badge";
import { SideBarTrigger } from "../sidebar/sidebar.provider";

export function AppHeader() {
  return (
    <div className=" shadow bg-gradient-to-r border-b border-b-slate-400 from-l_f_s to-l_f_f p-5 w-full h-[4svh] flex justify-between items-center">
      <div>
        <div className="flex gap-3 justify-center items-center">
          <SideBarTrigger />
          <Badge className="bg-button">Dashboard</Badge>
        </div>

        
        
      </div>
      <div>
        <div>
          <form action="">
            <input 
              type="text" 
              name="search"
              id="search"
              placeholder="Search for data" 
              className="bg-slate border border-bc w-fit h-[1.8rem] p-2 rounded-full" />
          </form>
        </div>
      </div>

      <div>Info</div>
    </div>
  );
}
