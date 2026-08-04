"use client";
import { useBanner } from "@/app/_components/_context/BannerContext";
export function BotonCambiar() {
  const { toggle } = useBanner();

  return (
    <button onClick={toggle}>
      Change Header / Footer Theme
    </button>
  );
}
