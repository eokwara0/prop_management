"use client";
import React, { useContext, useEffect } from "react";
import {
  LoginDispatchContext,
  LoginInfoActionType,
  LoginInfoContext,
} from "./login.info";

/**
 * Renders a series of clickable circles representing login steps or indices.
 *
 * @param length - The number of circles to render.
 *
 * @example
 * <LoginCircles length={5} />
 */
const LoginCircles: React.FC<{ length: number }> = ({ length }) => {
  const loginDispatch = useContext(LoginDispatchContext);
  const loginContext = useContext(LoginInfoContext);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!loginContext || !loginDispatch) return;
      let nextIndex = loginContext.index + 1;
      if (nextIndex >= length) {
        nextIndex = 0;
      }
      loginDispatch({
        type: LoginInfoActionType.SetIndex,
        newIndex: nextIndex,
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [length, loginContext, loginDispatch]);
  const handleClick = (index: number) => {
    if (!loginDispatch) return;
    loginDispatch({
      type: LoginInfoActionType.SetIndex,
      newIndex: index,
    });
  };

  return (
    <div className="flex gap-2 ">
      {Array.from({ length }, (_, index) => (
        <div
          key={index}
          className={`rounded-full w-2 h-2 ${
            loginContext?.index === index ? "bg-white" : "bg-slate-700"
          } cursor-pointer`}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default LoginCircles;
