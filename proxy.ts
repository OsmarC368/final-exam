import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";


const ProtectedRoutes = ["/weapon", "/dragons", "/character", "/episode", "/house", "/monarch", "/valyrian", "/castle"];
const SafeRoutes = ["/", "/login", "/register"];

const Proxy = async (request : NextRequest) => {
    const path = request.nextUrl.pathname;
    const isProtected = ProtectedRoutes.includes(path);
    const isSafe = SafeRoutes.includes(path);
    
    const session = (await cookies()).get("session")?.value;
    if (isProtected && !session) {
        return NextResponse.redirect(new URL("/", request.nextUrl))
    }

    if (isSafe && !session) {
        return NextResponse.next();
    }

    return NextResponse.next();
};

export default Proxy;
