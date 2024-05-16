import { USER_DATA } from "./database";

import { NextResponse } from "next/server";

export async function GET() {
  // add timestamp to all responses.

  const ts = new Date().getTime();

  const dataObject = {
    result: USER_DATA,
    timestamp: ts,
  };

  return NextResponse.json(dataObject);
}
