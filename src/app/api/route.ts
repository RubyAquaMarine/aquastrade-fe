import { USER_DATA } from "./data";
import { USER_WHITELIST } from "./whitelist";

export async function GET() {
  return Response.json(USER_DATA);
}
// add new user to the whitelist database after they purchase the nft
export async function POST(request: Request) {
  const insertUser = await request.json();
  const newUser = {
    id: USER_WHITELIST.length + 1,
    wallet: insertUser.text,
  };

  USER_WHITELIST.push(newUser);

  return new Response(JSON.stringify(newUser), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
