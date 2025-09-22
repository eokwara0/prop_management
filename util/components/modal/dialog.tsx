"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";
import { Separator } from "@/shadcn/components/ui/separator";
import { Apple, Beaker, GrapeIcon, TreePine } from "lucide-react";
import { ReactNode } from "react";
import { useIsMobile } from "../nav/sidebar/use.mobile";
import { useTranslations } from "next-intl";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shadcn/components/ui/sheet";

export function DialogComponent({ children }: { children: ReactNode }) {
  const t = useTranslations('Property')
  const isDesktop = useIsMobile();
  return isDesktop ? (
    <Sheet >
      <SheetTrigger className=" max-sm:w-full max-sm:flex max-sm:justify-start">
        <div className="w-full flex justify-start">{children}</div>
      </SheetTrigger>
      <SheetContent side="bottom" className=" shadow-md shadow-black/40 inset-shadow-2xs inset-shadow-muted/10 m-3 rounded-md outline-none  border-none  ring-1 ring-muted/40  backdrop-blur-md bg-gradient-to-br from-dialog-color to-dialog-color">
        <SheetHeader className="p-0">
          <SheetTitle className="text-sm text-muted/80 font-light px-5 py-2">
            {t("AddHeader")}
          </SheetTitle>
          <Separator className=" bg-button/30" style={{ height: 0.5 }} />
        </SheetHeader>
        <div className="flex flex-col gap-4 px-5 py-5 justify-between items-center">
          <div className="flex flex-col justify-start w-full gap-2">
            <p className=" font-light text-sm text-muted/70">Exchange</p>
            <div className="w-full">
              <Select>
                <SelectTrigger className="w-full border-none ring ring-muted/20">
                  <div className="flex gap-2 justify-center items-center">
                    <SelectValue placeholder="Binance" />
                  </div>
                </SelectTrigger>

                <SelectContent className="w-full bg-[#1c1c1e] text-white border-0 ring ring-muted/20">
                  <SelectGroup className="w-full bg-[#1c1c1e]">
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem
                      value="apple"
                      className=" cursor-pointer focus-visible:bg-button/80 focus-visible:text-white"
                    >
                      <div className="flex gap-2 items-center">
                        <p>Apple</p>
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="Blueberry"
                      className=" cursor-pointer focus-visible:bg-button/80 focus-visible:text-white"
                    >
                      <div className="flex gap-2 items-center">
                        <p>Blueberry</p>
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="Grapes"
                      className=" cursor-pointer focus-visible:bg-button/80 focus-visible:text-white"
                    >
                      <div className="flex gap-2 items-center">
                        <p>Grapes</p>
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="Pineapple"
                      className=" cursor-pointer focus-visible:bg-button/80 focus-visible:text-white"
                    >
                      <div className="flex gap-2 items-center">
                        <p>Pineapple</p>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full">
            <button
              type="button"
              className="p-1 bg-button w-full rounded cursor-pointer"
            >
              Connect
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog modal={false}>
      <DialogTrigger className=" max-sm:w-full max-sm:flex max-sm:justify-start">
        <div className="w-full">{children}</div>
      </DialogTrigger>
      <DialogContent
        style={{ width: 40, minWidth: 600  }}
        className=" ring-1 ring-muted/30 outline-none  border-none  p-0 backdrop-blur-md bg-gradient-to-br from-dialog-color to-dialog-color shadow-md shadow-black/30  inset-shadow-2xs inset-shadow-muted/10 text-xs"
      >
        <DialogHeader>
          <DialogTitle className="text-sm text-left  text-muted/80 font-light px-5 py-2">
            {t('AddHeader')}
          </DialogTitle>
          <Separator className=" bg-button/90" style={{ height: 1 }} />
        </DialogHeader>
        <div className="flex flex-col gap-4 px-5 py-5  items-center">
          <div className="flex flex-col justify-start w-full gap-2">
            <p className=" font-light text-sm text-muted/70">Exchange</p>
            <div className="w-full">
              <Select>
                <SelectTrigger className=" cursor-pointer w-full border-none ring ring-muted/20">
                  <div className="flex gap-2 justify-center items-center">
                    <SelectValue placeholder="Binance" />
                  </div>
                </SelectTrigger>
                <SelectContent className="w-full bg-[#1c1c1e] text-white border-0 ring ring-muted/20">
                  <SelectGroup className="w-full bg-[#1c1c1e]">
                    <SelectLabel className="text-muted">Fruits</SelectLabel>
                    <SelectItem
                      value="apple"
                      className=" cursor-pointer focus-visible:bg-button focus:bg-button focus-within:bg-button focus-visible:text-white"
                    >
                      <div className="flex gap-2 items-center text-muted">
                        <p>Apple</p>
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="Blueberry"
                      className=" cursor-pointer focus-visible:bg-button/80 focus:bg-button focus-visible:text-white"
                    >
                      <div className="flex gap-2 items-center text-muted">
                        <p>Blueberry</p>
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="Grapes"
                      className=" cursor-pointer focus-visible:bg-button/80 focus:bg-button focus-visible:text-white"
                    >
                      <div className="flex gap-2 items-center text-muted">
                        <p>Grapes</p>
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="Pineapple"
                      className=" cursor-pointer focus-visible:bg-button/80 focus:bg-button focus-visible:text-white"
                    >
                      <div className="flex gap-2 items-center text-muted">
                        <p>Pineapple</p>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full">
            <button
              type="button"
              className="py-2 text-muted text-sm bg-button w-full rounded-lg cursor-pointer shadow-sm shadow-black/50  inset-shadow-2xs inset-shadow-muted/50 "
            >
              Add Property
            </button>
          </div>
          <div className="w-full h-60 #bg-amber-200">
            
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
