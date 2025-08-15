import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const contentId = searchParams.get('contentId');
    
    if (!contentId) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      );
    }

    // Verify payment was processed (x402 middleware handles this)
    // If we reach here, payment is verified
    
    // Fetch the paywall content from Convex
    const content = await fetchQuery(api.paywallContent.getById, { 
      contentId 
    });
    
    if (!content) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }

    // Generate temporary access token
    const accessToken = crypto.randomUUID();
    
    // Return the protected content
    return NextResponse.json({
      content: {
        id: content._id,
        title: content.title,
        type: content.type,
        data: content.content, // The actual protected content
        creator: content.userId,
      },
      accessToken,
      expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour
    });
  } catch (error) {
    console.error('Error fetching paywall content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentId } = body;
    
    if (!contentId) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      );
    }

    // Similar logic for POST requests
    const content = await fetchQuery(api.paywallContent.getById, { 
      contentId 
    });
    
    if (!content) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      content: {
        id: content._id,
        title: content.title,
        type: content.type,
        data: content.content,
        creator: content.userId,
      },
      accessToken: crypto.randomUUID(),
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
    });
  } catch (error) {
    console.error('Error processing paywall content:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}