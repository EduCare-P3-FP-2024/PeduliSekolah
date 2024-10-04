import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyTokenJose } from "./utils/jose";

export const middleware = async (request: NextRequest) => {
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
    tokenData = await verifyTokenJose<{ id: string, role: string }>(token.value);
  } catch (error) {
    console.log("Failed to decode", error);
    return NextResponse.json({
      statusCode: 401,
      error: "Invalid token",
    });
  }

  // Check if this is an admin page
  const url = request.nextUrl;
  const isAdminPage = url.pathname.startsWith("/admin");

  const response = NextResponse.next();

  if (isAdminPage) {
    // Set user ID in the cookie for admin pages
    response.cookies.set("userId", tokenData.id, {
      httpOnly: true,
      path: "/",
    });
  } else {
    // Attach user information to request headers for other pages
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-userId", tokenData.id);
    requestHeaders.set("x-role", tokenData.role);
    
    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  return response;
};

export const config = {
  matcher: ["/admin/"],
};
