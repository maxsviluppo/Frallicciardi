import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function GET() {
  return NextResponse.json({
    configured: !!process.env.BLOB_READ_WRITE_TOKEN
  });
}

export async function POST(req: Request) {
  try {
    // Check if it's a client-side token request (JSON payload)
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = (await req.json()) as HandleUploadBody;
      
      const jsonResponse = await handleUpload({
        body,
        request: req,
        onBeforeGenerateToken: async (pathname) => {
          // Authentication / validation can go here
          // We allow images and videos
          return {
            allowedContentTypes: [
              'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif',
              'video/mp4', 'video/webm', 'video/ogg'
            ],
            tokenPayload: JSON.stringify({
              // We could include user session details here
            }),
          };
        },
        onUploadCompleted: async ({ blob, tokenPayload }) => {
          console.log('Upload completed:', blob, tokenPayload);
        },
      });
      
      return NextResponse.json(jsonResponse);
    }

    // Fallback: standard multipart/form-data upload (legacy / small files)
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ success: false, error: 'Nessun file caricato' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'video/ogg'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: `Tipo di file non supportato: ${file.type}. Usa immagini (JPG, PNG, WEBP) o video (MP4, WEBM).` },
        { status: 400 }
      );
    }

    // Max size 100MB
    const MAX_SIZE = 100 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: `File troppo grande (${(file.size / 1024 / 1024).toFixed(1)}MB). Massimo 100MB.` },
        { status: 400 }
      );
    }

    // Create unique filename
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const safeName = file.name
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-zA-Z0-9]/g, '-')
      .toLowerCase()
      .slice(0, 50);
    const filename = `media/${Date.now()}-${safeName}.${ext}`;

    // Check if BLOB_READ_WRITE_TOKEN is available
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      // Fallback: return a placeholder URL for local development
      return NextResponse.json({
        success: true,
        url: `https://placeholder.frallicciardi.it/${filename}`,
        warning: 'BLOB_READ_WRITE_TOKEN non configurato. Configura Vercel Blob in produzione.',
        isPlaceholder: true
      });
    }

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
      addRandomSuffix: false,
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      filename: blob.pathname,
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Errore durante il caricamento' },
      { status: 500 }
    );
  }
}
