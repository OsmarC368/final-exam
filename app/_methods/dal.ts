"use server"
import { decrypt, logout } from "@/app/_methods/sesion"
import { cookies } from "next/headers"

const checkUser = async () => {
    const cookie = await cookies();
    const val = cookie.get("session");
    return val;
}

const GetUser = async () => {
    const val = await checkUser();
    if (!val) return null;
    const user = await decrypt(val.value);
    return user;
}

const LoginOut = async () => {
    await logout();
}

export { LoginOut, GetUser, checkUser}