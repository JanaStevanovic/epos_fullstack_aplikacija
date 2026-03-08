import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/db/index";
import { startupIdeas } from "@/db/schema";
import { verifyToken } from "@/lib/auth";

export async function POST(req: Request) {
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

    const body = await req.json();
    const {
      title,
      conceptDescription,
      problem,
      solution,
      targetMarket,
      startupStage,
    } = body;

    if (
      !title ||
      !conceptDescription ||
      !problem ||
      !solution ||
      !targetMarket ||
      !startupStage
    ) {
      return NextResponse.json(
        { error: "Sva polja su obavezna." },
        { status: 400 }
      );
    }

    await db.insert(startupIdeas).values({
      title,
      conceptDescription,
      problem,
      solution,
      targetMarket,
      startupStage,
      ownerId: payload.userId,
    });

    return NextResponse.json(
      { message: "Ideja je uspešno sačuvana." },
      { status: 201 }
    );
  } catch (error) {
    console.error("IDEA CREATE ERROR:", error);

    return NextResponse.json(
      { error: "Kreiranje ideje nije uspelo." },
      { status: 500 }
    );
  }
}

export async function GET() {
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

    const ideas = await db
      .select()
      .from(startupIdeas)
      .where(eq(startupIdeas.ownerId, payload.userId));

    return NextResponse.json({ ideas }, { status: 200 });
  } catch (error) {
    console.error("IDEAS FETCH ERROR:", error);

    return NextResponse.json(
      { error: "Neuspešno učitavanje ideja." },
      { status: 500 }
    );
  }
}