import { USER_DATA } from "./database";

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(USER_DATA);
}

// add new user to the whitelist database after they purchase the nft
export async function POST(request: Request) {
  const insertUser = await request.json();
  const newUser = {
    id: (USER_DATA.length + 1).toString(),
    wallet: insertUser.text as string,
  };

  USER_DATA.push(newUser);

  return new Response(JSON.stringify(newUser), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
