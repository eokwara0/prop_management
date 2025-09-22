import { AnimatedHeader } from "@/util/components/animated/animated.header";
import { DialogComponent } from "@/util/components/modal/dialog";
import { SideBarPanel } from "@/util/components/nav/sidebar/sidebar.provider";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function Properties() {
  const t = await getTranslations("Property");
  return (
    <div className=" min-h-full w-full flex flex-col items-center  bg-gradient-to-r from-l_f_f to-l_f_s min-md:px-10">
      <div className="h-10"></div>
      <div className="flex flex-col justify-start w-full p-2 gap-3">
        
        <div className="flex justify-between max-sm:flex-col max-sm:gap-3 max-sm:justify-start">
          
          <AnimatedHeader />
          <DialogComponent>
            <div className=" p-2 rounded-md w-full cursor-pointer bg-button py-2 px-5  shadow-md shadow-black  inset-shadow-2xs inset-shadow-accent/50 text-xs">
              Add Property
            </div>
          </DialogComponent>
        </div>
        <p className=" w-full text-muted-foreground text-xl max-md:w-full max-md:p-2">
          {t("description")}
        </p>
      </div>
      <div className="  max-md:grid  min-md:flex  max-md:grid-cols-1 gap-4 w-full p-2">
        {...[1, 2, 3, 4, 5].map((x) => (
          <div
            key={x}
            className={`text-center flex justify-center items-center w-full rounded-lg backdrop-blur-lg shadow-md shadow-black  inset-shadow-2xs inset-shadow-accent/50 text-xs ${
              x == 1
                ? "bg-gradient-to-tr from-button to-emerald-600"
                : x == 2
                ? "bg-gradient-to-tr from-sky-400 to-emerald-600"
                : x == 3
                ? "bg-gradient-to-tr from-indigo-300 to-emerald-600"
                : x == 4
                ? "  bg-gradient-to-tr from-pink-400 to-pink-500"
                : "bg-gradient-to-br from-amber-300 to-amber-500"
            } h-60`}
          >
            {x}
          </div>
        ))}
      </div>
    </div>
  );
}
