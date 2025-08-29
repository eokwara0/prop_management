"use client";
import { useReducer, useRef } from "react";
import {
  BannerContext,
  BannerContextAction,
  BannerDispatchContext,
  BannerReducer,
} from "./banner.context";
import { IoCloseCircle } from "react-icons/io5";

export default function BannerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(BannerReducer, {
    message: <> </>,
    type: "info",
    show: false,
  });

  return (
    <BannerDispatchContext.Provider value={dispatch}>
      <BannerContext.Provider value={state || undefined}>
        <div
          className={` justify-between items-center shadow-2xs  w-full ${state?.show ? 'h-8' : ''} bg-gradient-to-r ${state?.type === "info"
              ? "from-banner-info-primary" :
              state?.type === "error"
                ? "from-banner-error-primary"
                : "from-banner-primary"
            } ${state?.type === "info" ?
              "from-banner-info-secondary" :
              state?.type === "error"
                ? "to-banner-error-secondary"
                : "to-banner-secondary"
            } flex`}
        >
          <div>{state?.show ? state.message : null}</div>
          {state?.show ? (
            <div className="">
              <button
                className="flex items-center justify-center p-2"
                onClick={() => {
                  dispatch({
                    type: BannerContextAction.CLOSE,
                    value: {
                      message: state.message,
                      type: state.type,
                    },
                  });
                }}
              >
                <IoCloseCircle size={25} />
              </button>
            </div>
          ) : null}
        </div>
        {children}
      </BannerContext.Provider>
    </BannerDispatchContext.Provider>
  );
}
