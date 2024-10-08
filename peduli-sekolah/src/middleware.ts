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
    tokenData = await verifyTokenJose<{
      id: string;
      role: string;
      account_type: string;
      username: string;
    }>(token.value);
  } catch (error) {
    console.log("Failed to decode token", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const url = request.nextUrl;
  const isAdminPage = url.pathname.startsWith("/admin");
  const isPostPage = url.pathname.startsWith("/post");

  const response = NextResponse.next();

  // Set user data in cookies for /admin and /post routes
  if (isAdminPage || isPostPage) {

    if(isAdminPage){
      if(tokenData.role !== "admin"){
    return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // Set user data in cookies
    response.cookies.set("userId", tokenData.id, {
      httpOnly: true,
      path: "/",
    });
    response.cookies.set("role", tokenData.role, {
      httpOnly: true,
      path: "/",
    });
    response.cookies.set("accountType", tokenData.account_type, {
      httpOnly: true,
      path: "/",
    });
    response.cookies.set("username", tokenData.username, {
      httpOnly: true,
      path: "/",
    });

    return response; // Return response after setting the cookies
  }

  // For other routes, set user details in headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-userId", tokenData.id); // Pass userId in headers
  requestHeaders.set("x-role", tokenData.role); // Pass role in headers
  requestHeaders.set("x-accountType", tokenData.account_type); // Pass account type in headers
  requestHeaders.set("x-username", tokenData.username); // Pass username in headers

  return NextResponse.next({
    headers: requestHeaders,
  });
};

// Configure paths for the middleware to match
export const config = {
  matcher: [
    "/admin/:path*", // Protect admin pages
    "/midtrans", // Protect midtrans-related routes
    "/school-document/:path*", // Protect school-document pages
    "/post/:path*", // Protect post-related routes and apply user cookies
  ],
};
