"use client"
import Image from "next/image"
import { useEffect, useReducer, useRef, useState } from "react";


const dragonsImages = [
  {
    name: "Caraxes",
    src: "https://i.pinimg.com/736x/b3/46/17/b34617babbefb5c803e949568a4c7dec.jpg"
  },
  {
    name: "Seasmoke",
    src: "https://i.pinimg.com/736x/39/99/49/39994928c6177f956d06f44537f8f111.jpg"
  },
  {
    name: "Vhagar",
    src: "https://i.pinimg.com/736x/ee/5e/92/ee5e92965078dd25d2491917b547cf64.jpg"
  },
  {
    name: "Vermithor",
    src: "https://i.pinimg.com/736x/cd/8c/5e/cd8c5ed85ad429aff1f5226a199cf198.jpg"
  }

]

const imageReducer = (index: number, action: string) => {
  switch(action)
  {
    case "Next":
      return (index + 1) % dragonsImages.length;
    case "Prev":
      return (index - 1 + dragonsImages.length) % dragonsImages.length;
    default:
      return index
  }

}

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState("0px");
  const [dragonIndex, change] = useReducer(imageReducer, 0);
  const currentDragon = dragonsImages[dragonIndex]

  useEffect(() => {
    const setdata = () => {
      if (isOpen) setHeight(`${contentRef.current?.scrollHeight}px`)
      else setHeight("0px")
    }
    setdata()
  }, [isOpen, currentDragon])

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
            <h4>{currentDragon.name}</h4>
            <Image src={currentDragon.src} alt="Dragon" width={300} height={300}></Image>
            <div className="flex gap-2 mt-2">
              <button onClick={() => change("Prev")}>Prev</button>
              <button onClick={() => change("Next")}>Next</button>
            </div>
            <br />
            <br />
          </div>
        </div>
      </main>
    </div>
  );
}
