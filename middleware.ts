import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    // 🔹 Fake login flag (replace with your logic later)
    const isLoggedIn = false // change to true to simulate a logged-in user
    console.log("middleware")

    const isAuthPage = req.nextUrl.pathname.startsWith('/login')
    const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard')

    // 🚫 Not logged in and trying to access dashboard → redirect to /login
    if (!isLoggedIn && isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    // ✅ Logged in and going to /login → redirect to /dashboard
    if (isLoggedIn && isAuthPage) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // ✅ Otherwise, allow access
    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard', '/login'],
}
