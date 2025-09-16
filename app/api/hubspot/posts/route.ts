// API para obtener posts// app/api/hubspot/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { HubSpotBlogService } from '@/lib/hubspot';

const hubspot = new HubSpotBlogService();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'en';
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const posts = await hubspot.getPostsByLanguage(language, limit, offset);

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        limit,
        offset,
        total: posts.length
      }
    });

  } catch (error) {
    console.error('Error in posts API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch posts' 
      },
      { status: 500 }
    );
  }
}
