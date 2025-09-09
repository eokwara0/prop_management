import { Accordion, AccordionContent } from "@/shadcn/components/ui/accordion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/shadcn/components/ui/dropdown-menu";
import { AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { Album, Angry } from "lucide-react";
import { IoNotifications } from "react-icons/io5";


export function Notification() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IoNotifications size={14}/>
            
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-[18em] bg-gradient-to-r from-l_f_f to-l_f_s  overflow-auto" align="start" sideOffset={10}>
          <Accordion
      type="single"
      collapsible
      className="w-full bg-transparent text-white"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="border-b flex items-center gap-1 border-b-white w-full text-left p-2">
            <IoNotifications size={18}/>
            <p>Notifications</p>
          </AccordionTrigger>

        <AccordionContent className="rounded hover:bg-slate-300 hover:text-black p-2  w-full flex  gap-2 items-center text-balance">
          
            <Angry size={15}/>
          <p>
            Mbusiso Sent a message
          </p>
        </AccordionContent>
        <AccordionContent className="rounded hover:bg-slate-300 hover:text-black p-2 w-full flex  gap-2 items-center text-balance">
          <Album size={15}/>
          <p>
            Properties updated.
          </p>
         
        </AccordionContent>
      </AccordionItem>
    </Accordion>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}