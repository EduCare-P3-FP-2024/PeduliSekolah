// app/api/school-document/route.ts
import { NextResponse } from "next/server"; // Use NextResponse from next/server
import { addDocument } from "@/db/models/schoolDocument";
import { ObjectId } from "mongodb";
import { SchoolDocumentInput } from "@/utils/types";

// Function to get userId from the request header
async function getUserIdFromHeader(headers: Headers): Promise<ObjectId> {
  const userId = headers.get('x-userid') as string;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return new ObjectId(userId);
}

// POST handler
export async function POST(req: Request) {
  try {
    // Get user ID from request headers
    const userId = await getUserIdFromHeader(req.headers);

    // Parse the incoming form data
    const { name, email, phone, location, description, imageFileUrl } = await req.json();

    // Create the school document
    const schoolDocument: SchoolDocumentInput = {
      name,
      email,
      phoneNumber: phone,
      location,
      description,
      imageFileUrl: imageFileUrl ? imageFileUrl : [], // Handle image URL array
      userId,
      status: "pending", // Set status to pending by default
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert the document into the DB
    const result = await addDocument(schoolDocument);

    // Use NextResponse to return a JSON response
    return NextResponse.json({ success: true, message: "School profile created", result }, { status: 200 });
  } catch (error) {
    if(error instanceof Error){     
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
}

// If you need to support more methods, you can do that similarly
