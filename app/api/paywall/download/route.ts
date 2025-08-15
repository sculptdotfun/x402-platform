import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fileId = searchParams.get('fileId');
    
    if (!fileId) {
      return NextResponse.json(
        { error: 'File ID is required' },
        { status: 400 }
      );
    }

    // Payment is already verified by x402 middleware
    
    // Fetch the file metadata from Convex
    const file = await fetchQuery(api.paywallContent.getById, { 
      contentId: fileId 
    });
    
    if (!file || file.type !== 'file') {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Generate a temporary signed download URL
    // In production, this would integrate with your file storage service
    const downloadUrl = await generateSignedUrl(file.fileUrl);
    
    // Record the download transaction
    await fetchMutation(api.transactions.create, {
      contentId: fileId,
      type: 'download',
      amount: file.price,
      timestamp: Date.now(),
    });
    
    return NextResponse.json({
      downloadUrl,
      fileName: file.fileName,
      fileSize: file.fileSize,
      mimeType: file.mimeType,
      expiresAt: new Date(Date.now() + 900000).toISOString(), // 15 minutes
    });
  } catch (error) {
    console.error('Error processing file download:', error);
    return NextResponse.json(
      { error: 'Failed to process download' },
      { status: 500 }
    );
  }
}

// Helper function to generate signed URLs for file downloads
async function generateSignedUrl(fileUrl: string): Promise<string> {
  // In production, integrate with your file storage service (S3, Cloudflare R2, etc.)
  // For now, return a temporary URL with expiration token
  const token = crypto.randomUUID();
  const expiresAt = Date.now() + 900000; // 15 minutes
  
  return `${fileUrl}?token=${token}&expires=${expiresAt}`;
}