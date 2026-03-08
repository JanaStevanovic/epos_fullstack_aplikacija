import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { eq, and } from "drizzle-orm";
import { db } from "@/db/index";
import { startupIdeas } from "@/db/schema";
import { verifyToken } from "@/lib/auth";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(req: Request, { params }: Params) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Niste prijavljeni." }, { status: 401 });
    }

    const payload = verifyToken(token) as { userId: string; email: string } | null;

    if (!payload) {
      return NextResponse.json({ error: "Nevažeći token." }, { status: 401 });
    }

    const { id } = await params;

    await db
      .delete(startupIdeas)
      .where(
        and(
          eq(startupIdeas.id, id),
          eq(startupIdeas.ownerId, payload.userId)
        )
      );

    return NextResponse.json(
      { message: "Ideja je uspešno obrisana." },
      { status: 200 }
    );
  } catch (error) {
    console.error("IDEA DELETE ERROR:", error);

    return NextResponse.json(
      { error: "Brisanje ideje nije uspelo." },
      { status: 500 }
    );
  }
}