import { ChevronLeft } from "lucide-react";
import { usePropertyFormContext } from "./property.form.provider";
import { useClientId, useFetchWithCred } from "@/util/util/fetch.with.cred";
import { useTransition } from "react";
import Loader from "../../loader/loader";
import { useBanner } from "../../context/banner/banner.context";
import Modal from "../../modal/modal";

export default function ImageStep() {
  const { updateData, data, nextStep, prevStep } = usePropertyFormContext();
  const clientId = useClientId();
  const fetch = useFetchWithCred();
  const [isPending, startTransition] = useTransition();
  const {show} = useBanner()

  const handleSubmit = () => {
    startTransition(async () => {
      try {
        const data_ = await fetch(`/api/property/${clientId}`, {
          method: "POST",
          body: JSON.stringify(data),
        });
        show(<Modal firstMessage="successful" secondMessage={data_.message}/>, "success");
        console.log(data_);
      } catch (err) {
        show(<Modal key={`property-modal`} firstMessage={"Error"} secondMessage={(err as Error ).message }/> , "error")
        console.log(err);
      }
    });
  };

  return (
    <div className="px-5 gap-2 flex flex-col">
      <div className="flex justify-between items-center py-3">
        <h2 className="w-full">Image Step</h2>
        <button
          onClick={prevStep}
          className="text-button flex items-center cursor-pointer"
        >
          <ChevronLeft size={16} />
          <span>Back</span>
        </button>
      </div>
      <div className="w-[500px]"></div>
      <div className="w-full">
        {!isPending ? (
          <button
            onClick={handleSubmit}
            className="w-full p-2 cursor-pointer bg-button rounded-md text-[1rem] "
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="w-full p-2 cursor-pointer bg-button rounded-md text-[1rem] "
          >
            <Loader />
          </button>
        )}
      </div>
    </div>
  );
}
