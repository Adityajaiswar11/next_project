// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body?.firstName || !body?.email ||!body.username || !body?.password) {
      return NextResponse.json(
        { message: "firstName, email, username and password are required" },
        { status: 400 },
      );
    }

    const response = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to create user" },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(
      {
        message: "User created successfully",
        data,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
