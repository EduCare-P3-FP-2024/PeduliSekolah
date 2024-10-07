import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyTokenJose } from "./utils/jose";

export const middleware = async (request: NextRequest) => {
  // Skip middleware for auth-related API requests
  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Retrieve token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  // Redirect to login if no token exists
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let tokenData;
  try {
    // Verify the token and extract user data (id, role, etc.)
    tokenData = await verifyTokenJose<{ id: string; role: string; account_type: string }>(token.value);
  } catch (error) {
    console.log("Failed to decode token", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const url = request.nextUrl;
  const isAdminPage = url.pathname.startsWith("/admin");
  
  const response = NextResponse.next();

  // Handle access to admin pages
  if (isAdminPage) {
    if (tokenData.role !== "admin") {
      // Redirect non-admin users to a forbidden or custom error page
      return NextResponse.redirect(new URL("/forbidden", request.url));
    }

    // Set userId in cookies for admin page actions
    response.cookies.set("userId", tokenData.id, {
      httpOnly: true,
      path: "/",
    });

    return response;  // Return response after setting the cookie for admin access
  }

  // For other routes, set the user details in headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-userId", tokenData.id);  // Pass userId in headers
  requestHeaders.set("x-role", tokenData.role);  // Pass role in headers

  return NextResponse.next({
    headers: requestHeaders,
  });
};

// Configure paths for the middleware to match
export const config = {
  matcher: [
    "/admin/:path*",            // Protect admin pages
    "/midtrans",                // Protect midtrans-related routes
    "/school-document/:path*",  // Protect school-document pages
  ],
};
