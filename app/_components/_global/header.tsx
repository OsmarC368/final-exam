import Link from "next/link"
import { GetUser } from "@/app/_methods/dal"
import { use } from "react"
import egg from "@/app/_resources/icons/egg-icon.png"
import dragon from "@/app/_resources/icons/dragon-icon.png"
import hand from "@/app/_resources/icons/hand-icon.png"
import Image from "next/image"

const Header = () => {
    const user = use(GetUser())
    let icon = hand
    if (user?.userType === "dragonseed") {
        icon = egg;
    }
    else if (user?.userType === "dragonrider") {
        icon = dragon;
    }

    return (
        <div style={{
            background: "linear-gradient(270deg,rgba(163, 0, 0, 1) 0%, rgba(102, 0, 0, 1) 58%, rgba(87, 23, 0, 1) 100%)",
            color: "#f8fafc",
            padding: "1rem 1.5rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)"
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
                <div>
                    <h2 style={{
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        margin: 0
                    }}>
                        Game of Thrones
                    </h2>
                </div>

                {!user ? (
                    <nav style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                        <Link href={"/login"} style={{ color: "#f8fafc", textDecoration: "none", padding: "0.45rem 0.8rem", borderRadius: "100px", background: "rgba(255,255,255,0.12)" }}>
                            Iniciar Sesión
                        </Link>
                        <Link href={"/register"} style={{ color: "#0f172a", textDecoration: "none", padding: "0.45rem 0.8rem", borderRadius: "100px", background: "#f8fafc", fontWeight: "600" }}>
                            Registrarse
                        </Link>
                    </nav>
                ) : (
                    <nav style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                        <Link href={"/"} style={{ color: "#f8fafc", textDecoration: "none", padding: "0.45rem 0.8rem", borderRadius: "100px", background: "rgba(255,255,255,0.12)" }}>
                            Inicio
                        </Link>
                        <Link href={"/logout"} style={{ color: "#0f172a", textDecoration: "none", padding: "0.45rem 0.8rem", borderRadius: "100px", background: "#f8fafc", fontWeight: "600" }}>
                            Cerrar Sesión
                        </Link>
                        <Image src={icon} alt="User Icon" width={40} height={40} />
                    </nav>
                    
                )}
            </div>
        </div>
    )
}

export default Header