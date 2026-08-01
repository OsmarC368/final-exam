import { NextRequest } from "next/server";
import { LoginOut } from "@/app/_methods/dal";

export async function GET(request: NextRequest) {
    await LoginOut();
    return Response.redirect(new URL("/", request.url));
}
