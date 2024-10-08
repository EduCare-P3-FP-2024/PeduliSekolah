import { NextResponse } from "next/server"; // Use NextResponse from next/server
import { addDocument } from "@/db/models/schoolDocument";
import { ObjectId } from "mongodb";
import { SchoolDocumentInput } from "@/utils/types";
import { cookies } from "next/headers";

// Function to get userId from the request header or cookies
async function getUserIdFromHeaderOrCookies(headers: Headers): Promise<ObjectId> {
  let userId: string | undefined = headers.get('x-userid') as string;

  if (!userId) {
    const userIdCookie = cookies().get("userId");
    if (userIdCookie) {
      userId = userIdCookie.value; // Access the value from the cookie object
    }
  }

  if (!userId) {
    throw new Error("Unauthorized: userId is missing from headers or cookies.");
  }

  return new ObjectId(userId);
}

// POST handler
export async function POST(req: Request) {
  try {
    // Get user ID from headers or cookies
    const userId = await getUserIdFromHeaderOrCookies(req.headers);

    // Parse the incoming form data
    const { name, email, phone, purpose, location, description, imageFileUrl } = await req.json();

    // Create the school document
    const schoolDocument: SchoolDocumentInput = {
      name,
      email,
      phoneNumber: phone,
      location,
      description,
      imageFileUrl: imageFileUrl ? imageFileUrl : [], // Handle image URL array
      userId,
      purpose,
      status: "pending", // Set status to pending by default
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert the document into the DB
    const result = await addDocument(schoolDocument);

    // Use NextResponse to return a JSON response
    return NextResponse.json({ success: true, message: "School profile created", result }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }
}
