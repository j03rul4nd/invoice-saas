// API para post individual app/api/hubspot/post/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { HubSpotBlogService } from '@/lib/hubspot';

const hubspot = new HubSpotBlogService();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'en';

    const post = await hubspot.getPostBySlug(slug, language);

    if (!post) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Post not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post
    });

  } catch (error) {
    console.error('Error in post API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch post' 
      },
      { status: 500 }
    );
  }
}