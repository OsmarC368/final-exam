"use client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    const setdata = () => {
      if(isOpen) setHeight(`${contentRef.current?.scrollHeight}px`) 
        else setHeight("0px")
    }
    setdata()
  }, [isOpen])

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-100 sm:text-6xl">
            Game of Thrones
          </h1>
          <div>
            <button onClick={() => setIsOpen(!isOpen)}>{(isOpen) ? "Hide" : "Show"}</button>
          </div>
          <div ref={contentRef} style={{
            maxHeight: height,
            overflow: "hidden",
            backgroundColor: "transparent",
            border: "1px solid red",
            borderRadius: "15px",
            padding: isOpen ? "20px" : "0 12px"
          }}>
            <h1>Wiki</h1>
            <h3>Explore the world of Game of Thrones and House of the Dragon.</h3>
            <Image src="https://i.pinimg.com/736x/b3/46/17/b34617babbefb5c803e949568a4c7dec.jpg" alt="Dragon" width={300} height={300}></Image>
            <br />
          </div>
        </div>
      </main>
    </div>
  );
}
