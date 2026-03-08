import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";
import { db } from "@/db/index";
import { users } from "@/db/schema";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const payload = verifyToken(token) as { userId: string; email: string } | null;

  if (!payload) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const foundUsers = await db
    .select()
    .from(users)
    .where(eq(users.id, payload.userId));

  const user = foundUsers[0];

  if (!user) {
    return NextResponse.json({ user: null }, { status: 404 });
  }

  return NextResponse.json(
    {
      user: {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    },
    { status: 200 }
  );
}