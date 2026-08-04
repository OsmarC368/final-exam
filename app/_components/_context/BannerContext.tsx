"use client"
import { createContext, useContext, useState } from "react";

const REDGRADIENT = "linear-gradient(270deg,rgba(163, 0, 0, 1) 0%, rgba(102, 0, 0, 1) 58%, rgba(87, 23, 0, 1) 100%)"
const GREENGRADIENT = "linear-gradient(270deg,rgba(0, 163, 128, 1) 0%, rgba(0, 102, 32, 1) 58%, rgba(42, 87, 0, 1) 100%)"

const BannerContext = createContext({
        banner: REDGRADIENT,
        toggle: () => { }
    })

export function BannerProvider({ children }: { children: React.ReactNode }) {
    const [banner, setBanner] = useState(REDGRADIENT)
    const toggle = () => {setBanner((color) => color === REDGRADIENT ? GREENGRADIENT : REDGRADIENT)}

    return (
        <BannerContext.Provider value={{ banner, toggle }}>
            {children}
        </BannerContext.Provider>
    )
}

export const useBanner = () => useContext(BannerContext);