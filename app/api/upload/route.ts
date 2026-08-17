import { NextResponse } from 'next/server';
import { del, put } from '@vercel/blob';

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB — the client resizes before uploading, this is just a backstop
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const EXT_BY_TYPE: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

function notConfigured() {
  return NextResponse.json(
    {
      error:
        'Image uploads are not configured on this deployment. Add a BLOB_READ_WRITE_TOKEN environment variable (create a Blob store in the Vercel dashboard) and redeploy.',
    },
    { status: 501 },
  );
}

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return notConfigured();

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid upload.' }, { status: 400 });
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: 'Only JPG, PNG, or WebP images are allowed.' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Image is larger than 10 MB.' }, { status: 400 });
  }

  const ext = EXT_BY_TYPE[file.type] ?? 'jpg';
  const key = `cars/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  try {
    const blob = await put(key, file, { access: 'public', contentType: file.type });
    return NextResponse.json({ url: blob.url });
  } catch {
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 502 });
  }
}

// Best-effort cleanup of a previous photo once it's replaced. Failures here
// are non-fatal — an orphaned blob just sits unused in storage.
export async function DELETE(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return notConfigured();

  const body = await request.json().catch(() => null);
  const url = body && typeof body.url === 'string' ? body.url : '';
  if (!url || !/^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//.test(url)) {
    return NextResponse.json({ error: 'Invalid url.' }, { status: 400 });
  }

  try {
    await del(url);
  } catch {
    // ignore — non-fatal
  }
  return NextResponse.json({ ok: true });
}
