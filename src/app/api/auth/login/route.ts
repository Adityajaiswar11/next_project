import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;
    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 },
      );
    }

    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const data = await response.json();
    console.log(data)

    // transform data
    const user = {
      id: data.id,
      email: data.email,
      name: data.firstName + " " + data.lastName,
      profile: data.image,
      gender: data.gender,
      role: data.role,
      token: data.accessToken,
      refreshToken: data.refreshToken,
    };

    // Set cookie here
    const res = NextResponse.json({ user }, { status: 200 });

    res.cookies.set("accessToken", data.token, {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
