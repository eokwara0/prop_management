import { Badge } from "@/shadcn/components/ui/badge";
import { SideBarTrigger } from "../sidebar/sidebar.provider";

export function AppHeader(){

    return (

        <div className=" shadow bg-gradient-to-r border-b border-b-slate-400 from-l_f_s to-l_f_f p-5 w-full h-[4svh] flex justify-between items-center">
            <div className="flex gap-3 justify-center items-center">
                <SideBarTrigger/>
                <Badge className="bg-button">
                    Dashboard
                </Badge>
            </div>
            <div>Info</div>
        </div>
    );
}