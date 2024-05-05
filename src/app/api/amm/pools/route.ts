import { USER_DATA } from "./database";

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(USER_DATA);
}
