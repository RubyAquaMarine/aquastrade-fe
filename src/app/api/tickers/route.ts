import { USER_DATA } from "./database";

import { NextResponse } from "next/server";

export async function GET() {
  // ideas about reformatting the data for better usability
  /*
- pool address should show Symbols and Decimals below
- NUmber for out pricing 
- reserves 
*/

  return NextResponse.json(USER_DATA);
}
