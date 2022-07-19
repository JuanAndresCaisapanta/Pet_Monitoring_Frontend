import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { IToken } from "../../interfaces";
import jwt_decode from "jwt-decode";
export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const { token = "" } = req.cookies;

  const url = req.nextUrl.clone();
  try {
    const data = jwt_decode(token) as IToken;
    if (data?.role[0].authority.toString() == "User" || !token) {
      url.pathname = "/auth/login";
      return NextResponse.rewrite(url);
    }
  } catch (error) {
    url.pathname = "/auth/login";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
