import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { IToken } from "../../interfaces";
import jwt from "jsonwebtoken";
export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const { token = "" } = req.cookies;

  const url = req.nextUrl.clone();
  const data = jwt.decode(token) as IToken;
  if (data?.role[0].authority.toString() == "ROLE_USER" || !token) {
    url.pathname = "/auth/login";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
