import { NextResponse } from "next/server";
import { getAccountByUsername } from "@/lib/sqllite";

export async function GET( {query}) {
  const username = query.username
  const data = await getAccountByUsername(username)
  return NextResponse.json(data)
}
