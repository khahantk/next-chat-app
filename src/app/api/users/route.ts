import { fetchUsers } from "@/db/queries/user"
import { NextResponse } from "next/server"
import { auth } from "@/auth"

export async function GET() {
  const session = await auth();
  const excludedUserId = session?.user?.id;
  const users = await fetchUsers(excludedUserId);
  return NextResponse.json(users)
}
