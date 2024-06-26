import { USER_DATA } from "./database";
import { USER_WHITELIST } from "./whitelist";

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(USER_DATA);
}

// add new user to the whitelist database after they purchase the nft
export async function POST(request: Request) {
  const insertUser = await request.json();
  const newUser = {
    id: USER_WHITELIST.length + 1,
    wallet: insertUser.text,
  };

  USER_WHITELIST.push(newUser);

  return new NextResponse(JSON.stringify(newUser), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
