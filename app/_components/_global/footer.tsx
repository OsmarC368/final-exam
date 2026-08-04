"use client"
import { BotonCambiar } from "@/app/_components/_global/toggle-banner"
import {useBanner} from "@/app/_components/_context/BannerContext"

const Footer = () => {
    const { banner } = useBanner();
    return (
        <div style={{
            background: banner,
            color: "#e2e8f0",
            padding: "1rem 1.5rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)"
        }}>
            <div style={{
                maxWidth: "100vw",
                margin: "0 auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap"
            }}>
                <p style={{ margin: 0, fontSize: "0.95rem" }}>
                    © 2026 Final Exam. Todos los derechos reservados.
                </p>
                <BotonCambiar/>
            </div>
        </div>
    )
}

export default Footer