import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/_methods/sesion";

const ProtectedRoutes = ["/weapon", "/dragons", "/character", "/episode", "/house", "/monarch", "/valyrian", "/castle"];
const SafeRoutes = ["/", "/login", "/register"];
const DragonSeedRoutes = ["/dragons", "/character", "/episode"];
const DragonRiderRoutes = ["/dragons", "/character", "/episode", "/weapon", "/house", "/valyrian"];

const Proxy = async (request : NextRequest) => {
    const path = request.nextUrl.pathname;
    const isProtected = ProtectedRoutes.includes(path);
    const isSafe = SafeRoutes.includes(path);
    
    const session = (await cookies()).get("session")?.value;
    // if (session) {
    //     const user = await decrypt(session);
    //     if (user!.userType === "dragonseed" && !DragonSeedRoutes.includes(path)) {
    //         return NextResponse.redirect(new URL("/", request.nextUrl));
    //     }
    //     if (user!.userType === "dragonrider" && !DragonRiderRoutes.includes(path)) {
    //         return NextResponse.redirect(new URL("/", request.nextUrl));
    //     }
    // }
    if (isProtected && !session) {
        return NextResponse.redirect(new URL("/", request.nextUrl))
    }

    if (isSafe && !session) {
        return NextResponse.next();
    }

    return NextResponse.next();
};

export default Proxy;
