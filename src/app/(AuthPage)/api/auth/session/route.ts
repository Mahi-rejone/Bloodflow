// app/api/auth/session/route.ts

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Token is required",
      },
      { status: 400 },
    );
  }

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set("accessToken", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});

  return response;
}