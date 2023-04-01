import { db } from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';
import { validateJWT } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const cookieName = process.env.COOKIE_NAME as string;
  const data = await request.json();

  const user = await validateJWT(request.cookies.get(cookieName)?.value);

  await db.project.create({
    data: {
      name: data.name,
      ownerId: user.id as string,
    },
  });

  return NextResponse.json({
    data: { message: 'Project Created Successfully' },
  });
}
