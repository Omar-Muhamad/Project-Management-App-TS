import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { comparePasswords, createJWT } from "@/lib/auth";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const cookieName = process.env.COOKIE_NAME as string;
  const data = await req.json();

  const user = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: 'Invalid login' },
      {
        status: 401,
      },
    );
  }

  const isUser = await comparePasswords(data.password, user.password);

  if (isUser) {
    const jwt = await createJWT(user);

    return NextResponse.json(
      {},
      {
        headers: {
          'Set-Cookie': serialize(cookieName, jwt, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
          }),
        },
        status: 201,
      },
    );
  } else {
    return NextResponse.json(
      { error: 'Invalid login' },
      {
        status: 401,
      },
    );
  }
}