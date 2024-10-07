// middleware.ts
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyTokenJose } from "./utils/jose";

export const middleware = async (request: NextRequest) => {
  // Check if the request path starts with /api/auth, if so, bypass the middleware
  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Retrieve token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  // If token does not exist, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let tokenData;
  try {
    // Verify token and extract user data (id, role, etc.)
    tokenData = await verifyTokenJose<{ id: string; role: string; account_type: string }>(token.value);
    console.log(tokenData);
  } catch (error) {
    console.log("Failed to decode", error);
    return NextResponse.json({
      statusCode: 401,
      error: "Invalid token",
    });
  }

  // Check URL paths for admin or school-document access
  const url = request.nextUrl;
  const isAdminPage = url.pathname.startsWith("/admin");

  const response = NextResponse.next();

  // Admin page protection
  if (isAdminPage) {
    // Check if the user has the 'admin' role
    if (tokenData.role !== 'admin') {
      // If not an admin, redirect to Forbidden page or a custom error page
      return NextResponse.redirect(new URL("/forbidden", request.url));
    }

    // Set user ID in the cookie for admin pages if the user is admin
    response.cookies.set("userId", tokenData.id, {
      httpOnly: true,
      path: "/",
    });

    return response;  // Return response after handling admin case
  }

  // API endpoint protection
  if (url.pathname.startsWith("/api")) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-userId", tokenData.id);  // Set userId header
    requestHeaders.set("x-role", tokenData.role);  // Set role header

    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  // For other routes (e.g., school-document pages)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-userId", tokenData.id);  // Set userId header
  requestHeaders.set("x-role", tokenData.role);  // Set role header

  return NextResponse.next({
    headers: requestHeaders,
  });
};

export const config = {
  matcher: [
    "/admin/:path*",
    "/midtrans",
    "/school-document/:path*",
    "/api/:path*"
    // No need to add exclusion here
  ],
};
