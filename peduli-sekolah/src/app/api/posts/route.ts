import { NextResponse } from 'next/server';
import { getPosts } from '@/db/models/post';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Extract query parameters from the request URL
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'All';

    // Fetch posts from the database with pagination, category, and search
    const posts = await getPosts(Number(page), category, search);

    // Response object with paginated posts
    return NextResponse.json({ 
      data: posts,
      currentPage: Number(page),
      totalPages: Math.ceil(posts.length / Number(limit)),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
