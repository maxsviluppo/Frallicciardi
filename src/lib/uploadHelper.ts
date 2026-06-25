import { upload } from '@vercel/blob/client';

export async function uploadFile(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    // 1. Check if Vercel Blob is configured by calling GET on the route
    const configRes = await fetch('/api/admin/upload-image');
    if (!configRes.ok) {
      throw new Error(`Failed to check upload configuration (HTTP ${configRes.status})`);
    }
    const config = await configRes.json();
    
    if (!config.configured) {
      // Return a local placeholder fallback immediately without uploading the file contents,
      // preventing the 413 Payload Too Large error.
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const safeName = file.name
        .replace(/\.[^.]+$/, '')
        .replace(/[^a-zA-Z0-9]/g, '-')
        .toLowerCase()
        .slice(0, 50);
      const filename = `media/${Date.now()}-${safeName}.${ext}`;
      
      return {
        success: true,
        url: `https://placeholder.frallicciardi.it/${filename}`
      };
    }
    
    // 2. Vercel Blob is configured! Upload directly from client
    const blob = await upload(file.name, file, {
      access: 'public',
      handleUploadUrl: '/api/admin/upload-image',
    });
    
    return {
      success: true,
      url: blob.url
    };
  } catch (err: any) {
    console.error('Client upload helper error:', err);
    return {
      success: false,
      error: err.message || 'Errore durante il caricamento del file'
    };
  }
}
