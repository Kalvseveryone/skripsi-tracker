import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Tidak ada file yang diunggah' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const uniqueFileName = `${Date.now()}_${cleanFileName}`;

    let fileUrl = '';

    // Attempt to save to local public/uploads if filesystem is writable
    try {
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadDir, { recursive: true });
      const filePath = join(uploadDir, uniqueFileName);
      await writeFile(filePath, buffer);
      fileUrl = `/uploads/${uniqueFileName}`;
    } catch (fsErr) {
      // In serverless environments like Vercel (read-only filesystem), fallback to Base64 data URL
      const base64 = buffer.toString('base64');
      const mime = file.type || 'application/octet-stream';
      fileUrl = `data:${mime};base64,${base64}`;
    }

    return NextResponse.json({
      success: true,
      fileName: file.name,
      fileUrl,
      fileSize: file.size,
      mimeType: file.type,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Gagal mengunggah file. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}
