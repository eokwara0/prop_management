import React, { useContext } from "react";
import { useRef } from "react";
import { LoginInfoContext } from "../authentication/login.info";

function useLoginCircles(length: number) {
    const LoginInfo = useContext(LoginInfoContext);
    const refs = useRef<Array<React.RefObject<HTMLDivElement | null>>>([]);
    // Initialize refs only once
    if (refs.current.length !== length) {
        refs.current = Array.from({ length }, () =>
            React.createRef<HTMLDivElement>()
        );
    }

    const handleClick = (index: number) => {
        const currentRef = refs.current[index]?.current;
        LoginInfo!.changeIndex(index);
        if (currentRef) {
            // You can use currentRef here as needed
            console.log('Clicked ref:', currentRef);
        }
    };

    const NodeList: React.ReactNode[] = refs.current.map((ref, index) => (
        <div
            key={index}
            ref={ref}
            className="rounded-full w-2 h-2 bg-white"
            onClick={() => handleClick(index)}
        ></div>
    ));

    return { NodeList, refs: refs.current  };
}

export default useLoginCircles;