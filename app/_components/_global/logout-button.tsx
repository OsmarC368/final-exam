"use client"
import { logout } from "@/app/_methods/sesion"
import Form from "next/form"

const LogoutButton = () => {
    return (
        <Form action={logout} style={{
            color: "#0f172a",
            padding: "0.5rem 1rem",
            backgroundColor: "white",
            borderRadius: "15px",
        }}>
    <button type="submit">
        Log Out
    </button>

        </Form >
    )
}

export default LogoutButton