"use client";
import { Property, PropertySchema } from "@/util/models";
import {
  catpureStateType,
  PropertyFormContext,
  usePropertyFormContext,
} from "./add.property.form.provider";
import React, { useMemo } from "react";
import "@/app/globals.css";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronsRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";
import { Switch } from "@/shadcn/components/ui/switch";
import LocationStep from "./maps.form";
import DetailsStep from "./property.detail.form";
const LeafletMap = dynamic(() => import("../../map/leaflet.map"), {
  ssr: false,
});

export function PropertyFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = React.useState<Partial<Property> | null>(null);
  const [captureState, setCatpureState] =
    React.useState<catpureStateType>("location");
  const updateData = (newData: Partial<Property>) => {
    setData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const updateCaptureState = (state: catpureStateType) => {
    setCatpureState(state);
  };

  const nextStep = () => {
    if (captureState === "location") updateCaptureState("details");
    else if (captureState === "details") updateCaptureState("images");
  };

  const prevStep = () => {
    if (captureState === "images") updateCaptureState("details");
    else if (captureState === "details") updateCaptureState("location");
    else if (captureState === "location") updateCaptureState("images");
  };

  return (
    <>
      <PropertyFormContext.Provider
        value={{
          captureState,
          data,
          setData,
          updateData,
          nextStep,
          prevStep,
        }}
      >
        {children}
      </PropertyFormContext.Provider>
    </>
  );
}

export default function PropertyForm() {
  return (
    <PropertyFormProvider>
      <PropertyFormData />
    </PropertyFormProvider>
  );
}

function PropertyFormData() {
  const { captureState } = usePropertyFormContext();
  switch (captureState) {
    case "location":
      return <LocationStep />;
    case "details":
      return <DetailsStep />;
    case "images":
      return <ImageStep />;
  }
}





function ImageStep() {
  const { updateData, data, nextStep, prevStep } = usePropertyFormContext();
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
        <button
          onClick={prevStep}
          className="w-full cursor-pointer bg-button rounded-md text-lg "
        >
          Submit
        </button>
      </div>
    </div>
  );
}
