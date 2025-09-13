import { AnimatedHeader } from "@/util/components/animated/animated.header";
import { DataTableDemo } from "@/util/components/examples/datatable";

export default function Properties() {
    return (
        <div className="min-h-full w-full flex flex-col items-center  bg-gradient-to-r from-l_f_f to-l_f_s min-md:px-10">
            <div className="h-10"></div>
            <div className="flex flex-col justify-start w-full p-2 gap-3">
                <AnimatedHeader />
                <p className=" w-3/6 text-sm wrap-normal break-al max-md:w-full max-md:p-2">
                    Manage all your properties and their associated units from a single dashboard. Easily add new properties, update existing details, and organize units under each property.
                </p>
            </div>
            <div className="  max-md:grid  min-md:flex  max-md:grid-cols-1 gap-4 w-full p-2">
                <div className="w-full rounded-lg backdrop-blur-lg bg-gradient-to-tr from-button to-emerald-600  h-60"> h</div>
                <div className="w-full rounded-lg bg-gradient-to-tr from-sky-400 to-emerald-600  h-60 bg-slate-600"> h</div>
                <div className="w-full rounded-lg  h-60 bg-gradient-to-tr from-indigo-300 to-emerald-600"> h</div>
                <div className="w-full rounded-lg  h-60 bg-gradient-to-tr from-pink-400 to-pink-500"> h</div>
            </div>
            <DataTableDemo/>
        </div>
    );
}


