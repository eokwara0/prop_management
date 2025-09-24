"use client";
import { Property } from "@/util/models";
import {
  catpureStateType,
  PropertyFormContext,
  usePropertyFormContext,
} from "./add.property.form.provider";
import React, { useMemo } from "react";
import "@/app/globals.css";
import dynamic from "next/dynamic";
import { ChevronsRight } from "lucide-react";
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

function LocationStep() {
  const { updateData, data, nextStep, prevStep } = usePropertyFormContext();
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-2xl px-5 py-2">Maps</h1>
      <p className="text-sm px-5 py-1 text-muted/50">
        Type in your properties location
      </p>
      <div className="">
        <LeafletMap />
        <form action="" className="flex flex-col gap-5 px-5 py-2">
          <div>
            <h1 className="text-md font-extralight text-muted ">
              Property Details
            </h1>
          </div>
          <div className="flex gap-5 ">
            <label htmlFor="" className="flex flex-col gap-2 w-full flex-1/4">
              <p className="text-muted">StreetNumber</p>
              <input
                value={data?.streetNumber!}
                onChange={(e) => {
                  updateData!({
                    ...data,
                    streetNumber: Number(e.target.value),
                  });
                }}
                type="text"
                name=""
                id=""
                className=" rounded-md ring-[1px] ring-muted-foreground p-2 h-10 w-full"
              />
            </label>
            <label htmlFor="" className="flex flex-col gap-2 w-full flex-1/2">
              <p className="text-muted">StreetName</p>
              <input
                value={data?.streetName!}
                onChange={(e) => {
                  updateData!({
                    ...data,
                    streetName: e.target.value,
                  });
                }}
                type="text"
                name=""
                id=""
                className=" rounded-md ring-[1px] ring-muted-foreground p-2 h-10 w-full"
              />
            </label>
            <label htmlFor="" className="flex flex-col gap-2 w-full flex-1/2">
              <p className="text-muted">Suburb</p>
              <input
                value={data?.suburb!}
                onChange={(e) => {
                  updateData!({
                    ...data,
                    suburb: e.target.value,
                  });
                }}
                type="text"
                name=""
                id=""
                className=" rounded-md ring-[1px] ring-muted-foreground p-2 h-10 w-full"
              />
            </label>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <label htmlFor="" className="flex flex-col gap-2 w-full flex-1/2">
                <p className="text-muted">Address</p>
                <input
                  value={data?.address!}
                  onChange={(e) => {
                    updateData!({
                      ...data,
                      address: e.target.value,
                    });
                  }}
                  type="text"
                  name=""
                  id=""
                  className=" rounded-md ring-[1px] ring-muted-foreground p-2 h-10 w-full"
                />
              </label>

              <label className="flex flex-col gap-2 text-muted w-full">
                <p>City</p>
                <input
                  value={data?.city!}
                  onChange={(e) => {
                    updateData!({
                      ...data,
                      city: e.target.value,
                    });
                  }}
                  type="text"
                  name=""
                  id=""
                  className="rounded-md ring-[1px] ring-muted-foreground p-2 h-10 w-full"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2 text-muted w-full">
              <p>Country</p>
              <input
                value={data?.country!}
                onChange={(e) => {
                  updateData!({
                    ...data,
                    country: e.target.value,
                  });
                }}
                type="text"
                name=""
                id=""
                className="rounded-md ring-[1px] ring-muted-foreground p-2 h-10 w-full"
              />
            </label>
          </div>

          <div>
            {/* <p>Postal Details</p> */}
            <div className="flex gap-5">
              <label className="flex flex-col gap-2 text-muted w-full">
                <p>State</p>
                <input
                  value={data?.state!}
                  onChange={(e) => {
                    updateData!({
                      ...data,
                      state: e.target.value,
                    });
                  }}
                  type="text"
                  name=""
                  id=""
                  className="rounded-md ring-[1px] ring-muted-foreground p-2 h-10 w-full"
                />
              </label>
              <label className="flex flex-col gap-2 text-muted w-full">
                <p>Postal Code</p>
                <input
                  value={data?.postalCode!}
                  onChange={(e) => {
                    updateData!({
                      ...data,
                      postalCode: e.target.value,
                    });
                  }}
                  type="text"
                  name=""
                  id=""
                  className="rounded-md ring ring-[1px] ring-muted-foreground p-2 h-10 w-full"
                />
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className="px-5">
        <button
          onClick={nextStep}
          type="button"
          className="flex cursor-pointer items-center justify-center w-full bg-button p-2 text-[1rem] rounded-lg inset-shadow-2xs inset-shadow-muted shadow-2xs shadow-black"
        >
          Continue
          <div className="flex gap-0">
            <ChevronsRight />
          </div>
        </button>
      </div>
    </div>
  );
}

function DetailsStep() {
  const { updateData, data, nextStep, prevStep } = usePropertyFormContext();

  return (
    <>
      <div className="w-full flex flex-col gap-3 px-5  py-3"> 

        <h2 className="w-full">Fill in property details</h2>
      </div>
    </>
  );
}

function ImageStep() {
  const { updateData, data, nextStep, prevStep } = usePropertyFormContext();
  return (
    <div>
      <p>Image Step</p>
    </div>
  );
}
