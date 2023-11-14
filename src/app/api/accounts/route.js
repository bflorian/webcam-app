import { createAccount, listAccounts } from "@/lib/sqllite";

export async function GET(request) {
  const data = await listAccounts();
  return Response.json(data)
}

export async function POST(request) {
  const { username, password } = await request.json();
  const account = await createAccount(username, password);
  return Response.json(account)
}
