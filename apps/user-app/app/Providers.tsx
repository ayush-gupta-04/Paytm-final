'use client'
import { SessionProvider } from "next-auth/react";
import React, { useEffect } from 'react';
import { RecoilRoot } from "recoil";

type Children = {
    children : React.ReactNode
}
export default function Providers({children} : Children){
    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //       window.localStorage.getItem('recoil-persist');
    //     }
    //   }, []);

    return(
        <RecoilRoot>
            <SessionProvider>
                {children}
            </SessionProvider>
        </RecoilRoot>
    )
}

