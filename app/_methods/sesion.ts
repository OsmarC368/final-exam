"use server"
import "server-only"
import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Payload } from "./types"
import { JWT_KEY } from "./variables"

const encodedKey = new TextEncoder().encode(JWT_KEY)

export const decrypt = async (session: string | undefined = "") => {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256']
        });
        return payload as Payload;
    } catch(error) {
        console.log(error);
        return undefined;
    }
};

export const encrypt = async (payload: Payload) => {
    return new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime("50 min")
    .sign(encodedKey);
};

export const createSession = async (user : Payload) => {
    const data = await cookies();
    const expiresAt = new Date(Date.now() + (5 * 60 * 1000));
    const session = await encrypt(user);

    data.set("session", session, {
        httpOnly: true,
        secure: true, 
        expires: expiresAt,
        sameSite: "lax",
        path: "/"
    })

};

export const deleteSession = async () => {
    const data = await cookies()
    data?.delete("session");
};

export const logout = async () => {
    await deleteSession();
    redirect("/")
};