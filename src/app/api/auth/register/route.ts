import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Sva polja su obavezna." },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      passwordHash,
    });

    return NextResponse.json(
      { message: "Korisnik je uspešno registrovan." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Registracija nije uspela." },
      { status: 500 }
    );
  }
}