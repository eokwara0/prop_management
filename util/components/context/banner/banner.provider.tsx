"use client";
import { Component, JSX, useCallback, useReducer, useState } from "react";
import { BannerContext, BannerType } from "./banner.context";
import { IoCloseCircle } from "react-icons/io5";

export default function BannerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [Message, setMessage] = useState<React.ReactNode | undefined>(<></>);
  const [type, setType] = useState<BannerType>("info");

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const show = useCallback(
    (message_: React.ReactNode, type: BannerType) => {
      setType(type);
      setMessage(message_);
      setOpen(true);
      setTimeout(close, 5000);
    },
    [setMessage, setType, setOpen]
  );

  return (
    <BannerContext.Provider value={{ show, close }}>
      <div
        className={` justify-between items-center shadow-2xs  w-full ${
          isOpen ? "h-8" : ""
        } bg-gradient-to-r ${
          type === "info"
            ? "from-banner-info-primary"
            : type === "error"
            ? "from-banner-error-primary"
            : "from-banner-primary"
        } ${
          type === "info"
            ? "from-banner-info-secondary"
            : type === "error"
            ? "to-banner-error-secondary"
            : "to-banner-secondary"
        } flex`}
      >
        <div>{isOpen ? Message : null}</div>
        {isOpen ? (
          <div className="">
            <button
              className="flex items-center justify-center p-2"
              onClick={close}
            >
              <IoCloseCircle size={25} />
            </button>
          </div>
        ) : null}
      </div>
      {children}
    </BannerContext.Provider>
  );
}
