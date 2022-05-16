import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { IUser } from "../../interfaces";
export async function middleware(req: NextRequest | any, ev: NextFetchEvent ) {
  const { token = "" } = req.cookies;

  const url = req.nextUrl.clone();
  if (!token) {
    url.pathname = "/auth/login";
    return NextResponse.rewrite(url);
  }

  // const validRoles = ["ROLE_USER", "ROLE_ADMIN"];
  // const user =  jwt.decode(token) as IUser;
  // const ROLE_ADMIN = user.role[0].authority;
  // const ROLE_USER = user.role[1].authority;

  // if (!validRoles.includes(ROLE_ADMIN) || !validRoles.includes(ROLE_USER)) {
  //   url.pathname = "/auth/login";
  //   return NextResponse.rewrite(url);
  // }
  return NextResponse.next();
}
