import { db } from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';
import { createJWT, hashPassword } from '@/lib/auth';
import { serialize } from 'cookie';

export async function POST(request: NextRequest) {
  const cookieName = process.env.COOKIE_NAME;
  const data = await request.json();

  const user = await db.user.create({
    data: {
      email: data.email,
      password: await hashPassword(data.password),
      firstName: data.firstName,
      lastName: data.lastName,
    },
  });

  const jwt = await createJWT(user);

  return new NextResponse('Signup succeeded', {
    headers: {
      'Set-Cookie': serialize(cookieName as string, jwt, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      }),
    },
  });
}
