import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getUserById, updateUserType } from '@/db/models/user';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json(); // Expecting the userId in the request body
    const user = await getUserById(userId);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Update the user's account type to "Personal"
    await updateUserType(userId, 'Personal');
    return NextResponse.json({ message: 'User account type updated to Personal' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
