"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shadcn/components/ui/drawer";

export function DialogComponent({ children }: { children: ReactNode }) {
  const isDesktop = useIsMobile();
  return isDesktop ? (
    <Drawer>
      <DrawerTrigger className=" max-sm:w-full max-sm:flex max-sm:justify-start">
        <div className="w-full flex justify-start">{children}</div>
      </DrawerTrigger>
      <DrawerContent className=" outline-none  border-none ring-2 ring-button/40 p-0 backdrop-blur-md bg-gradient-to-br from-dialog-color to-dialog-color">
        <DrawerHeader>
          <DrawerTitle className="text-sm text-muted/80 font-light px-5 py-2">
            Connect new exchange
          </DrawerTitle>
          <Separator className=" bg-button/30" style={{ height: 0.1 }} />
        </DrawerHeader>
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
                        <Apple />
                        <p>Apple</p>
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="Blueberry"
                      className=" cursor-pointer focus-visible:bg-button/80 focus-visible:text-white"
                    >
                      <div className="flex gap-2 items-center">
                        <Beaker color="white" />
                        <p>Blueberry</p>
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="Grapes"
                      className=" cursor-pointer focus-visible:bg-button/80 focus-visible:text-white"
                    >
                      <div className="flex gap-2 items-center">
                        <GrapeIcon color="white" />

                        <p>Grapes</p>
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="Pineapple"
                      className=" cursor-pointer focus-visible:bg-button/80 focus-visible:text-white"
                    >
                      <div className="flex gap-2 items-center">
                        <TreePine color="white" />
                        <p>Pineapple</p>
                      </div>
                    </SelectItem>
                    {/* <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem> */}
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
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog modal={false}>
      <DrawerTrigger className=" max-sm:w-full max-sm:flex max-sm:justify-start">
        <div className="w-full">{children}</div>
      </DrawerTrigger>
      <DialogContent
        style={{ width: 40, minWidth: 600 }}
        className=" outline-none  border-none ring-2 ring-button/40 p-0 backdrop-blur-md bg-gradient-to-br from-dialog-color to-dialog-color"
      >
        <DialogHeader>
          <DialogTitle className="text-sm text-muted/80 font-light px-5 py-2">
            Connect new exchange
          </DialogTitle>
          <Separator className=" bg-button/30" style={{ height: 0.1 }} />
        </DialogHeader>
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
                        <Apple />
                        <p>Apple</p>
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="Blueberry"
                      className=" cursor-pointer focus-visible:bg-button/80 focus-visible:text-white"
                    >
                      <div className="flex gap-2 items-center">
                        <Beaker color="white" />
                        <p>Blueberry</p>
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="Grapes"
                      className=" cursor-pointer focus-visible:bg-button/80 focus-visible:text-white"
                    >
                      <div className="flex gap-2 items-center">
                        <GrapeIcon color="white" />

                        <p>Grapes</p>
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="Pineapple"
                      className=" cursor-pointer focus-visible:bg-button/80 focus-visible:text-white"
                    >
                      <div className="flex gap-2 items-center">
                        <TreePine color="white" />
                        <p>Pineapple</p>
                      </div>
                    </SelectItem>
                    {/* <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem> */}
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
      </DialogContent>
    </Dialog>
  );
}
