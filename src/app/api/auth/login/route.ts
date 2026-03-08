import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email i lozinka su obavezni." },
        { status: 400 }
      );
    }

    const foundUsers = await db.select().from(users).where(eq(users.email, email));
    const user = foundUsers[0];

    if (!user) {
      return NextResponse.json(
        { error: "Neispravni kredencijali." },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Neispravni kredencijali." },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
    });

    const response = NextResponse.json(
      { message: "Uspešna prijava." },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Prijava nije uspela." },
      { status: 500 }
    );
  }
}