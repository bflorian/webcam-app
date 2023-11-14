import { NextResponse } from "next/server";
import { createAccount, getAccount } from "@/lib/sqllite";

export async function GET(request) {
  // Data to be returned as JSON
  const url = request.url
  const accountID = url.slice(request.url.lastIndexOf('/') + 1)
  console.log('Account ID', accountID)
  if (!accountID) {
    return NextResponse.error(new Error({message: 'Account ID is required'}), {status: 400})
  }

  const data = await getAccount(accountID)
  return NextResponse.json(data)
}

export async function POST(request) {
  const { username, password } = await request.json();
  const account = await createAccount(username, password);
  return Response.json(account)
}
