import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { uploadFileToSupabase, isSupabaseConfigured } from '../../../lib/storage';


/**
 * Storage upload API route for Supabase Storage.
 */

export const config = {
  api: {
    bodyParser: false,
  },
};

type ResponseData = {
  success: boolean;
  url?: string;
  path?: string;
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  if (!isSupabaseConfigured()) {
    return res.status(400).json({
      success: false,
      message: 'Supabase is not configured.',
      error: 'Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local',
    });
  }

  try {
    const form = formidable({
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
    });

    const [fields, files] = await form.parse(req);
    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!uploadedFile) {
      return res.status(400).json({
        success: false,
        message: 'No file provided in form request under "file" field.',
      });
    }

    const bucket = (Array.isArray(fields.bucket) ? fields.bucket[0] : fields.bucket) || 'uploads';
    const folder = (Array.isArray(fields.folder) ? fields.folder[0] : fields.folder) || '';

    const fileBuffer = fs.readFileSync(uploadedFile.filepath);

    const result = await uploadFileToSupabase(fileBuffer, {
      bucket,
      folder,
      fileName: uploadedFile.originalFilename || undefined,
    });

    // Cleanup temp file
    try {
      fs.unlinkSync(uploadedFile.filepath);
    } catch (_) {}

    if (!result.success) {
      const isBucketError = result.error?.toLowerCase().includes('bucket not found');
      return res.status(isBucketError ? 400 : 500).json({
        success: false,
        message: isBucketError
          ? `The storage bucket "${bucket}" does not exist in your Supabase project.`
          : 'Failed to upload image to Supabase Storage.',
        error: isBucketError
          ? `Please create a storage bucket named "${bucket}" in Supabase Dashboard -> Storage -> Buckets and mark it as Public.`
          : result.error,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'File successfully uploaded to Supabase Storage.',
      url: result.url,
      path: result.path,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'File upload failed.',
      error: err?.message || 'Server error during upload.',
    });
  }
}
