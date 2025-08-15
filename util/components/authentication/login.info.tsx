'use client'
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import useLoginCircles from "../hooks/login_info.hook";
import { createContext } from "react";

type LoginInfoContextType = {
    index : number ;
    changeIndex : (index: number) => void;


}
const LoginInfoContext = createContext<LoginInfoContextType | undefined>({ index: 0, changeIndex: () => {} });
export default function LoginInfoBody({ length }: { length: number }) {
  const { NodeList, refs } = useLoginCircles(length);
  return <div className=" flex gap-5 mt-10">{NodeList}</div>;
}


export function LoginInfo({ length }: { length: number }) {
    const [ index , setIndex] = useState(0);

    const changeIndex = (newIndex: number) => {
        console.log(newIndex);
        setIndex(newIndex);
    }
    return <LoginInfoContext.Provider   value={{ index, changeIndex }}>
        <LoginInfoBody length={length} />
    </LoginInfoContext.Provider>
}
export { LoginInfoContext };
