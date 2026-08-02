import { supabase, getSupabaseAdmin, isSupabaseConfigured } from './supabase';

export { isSupabaseConfigured };

export const DEFAULT_STORAGE_BUCKET = 'uploads';


export interface UploadOptions {
  bucket?: string;
  folder?: string;
  fileName?: string;
  upsert?: boolean;
}

export interface UploadResult {
  success: boolean;
  url?: string;
  path?: string;
  error?: string;
}

/**
 * Get the public URL for a file in a Supabase Storage bucket.
 */
export function getPublicUrl(path: string, bucket: string = DEFAULT_STORAGE_BUCKET): string {
  if (!isSupabaseConfigured()) return '';
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data?.publicUrl || '';
}

/**
 * Upload a File or Buffer to Supabase Storage (Client or Server).
 */
export async function uploadFileToSupabase(
  file: File | Buffer,
  options: UploadOptions = {}
): Promise<UploadResult> {
  try {
    if (!isSupabaseConfigured()) {
      return {
        success: false,
        error: 'Supabase credentials are missing or unconfigured in environment variables.',
      };
    }

    const bucket = options.bucket || DEFAULT_STORAGE_BUCKET;
    const folder = options.folder ? `${options.folder.replace(/\/$/, '')}/` : '';
    const name = options.fileName || `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const filePath = `${folder}${name}`;

    let { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
      upsert: options.upsert ?? true,
    });

    // If bucket does not exist yet, attempt auto-creation and retry
    if (
      error &&
      (error.message.toLowerCase().includes('bucket not found') ||
        error.message.toLowerCase().includes('not found') ||
        (error as any).statusCode === '404' ||
        (error as any).error === 'Bucket not found')
    ) {
      try {
        // Try creating bucket via client
        await supabase.storage.createBucket(bucket, { public: true });
      } catch (_) {
        try {
          // Try creating bucket via admin client if available
          const admin = getSupabaseAdmin();
          await admin.storage.createBucket(bucket, { public: true });
        } catch (adminErr) {}
      }

      // Retry upload after bucket creation attempt
      const retry = await supabase.storage.from(bucket).upload(filePath, file, {
        upsert: options.upsert ?? true,
      });

      data = retry.data;
      error = retry.error;
    }

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    const publicUrl = getPublicUrl(data.path, bucket);

    return {
      success: true,
      url: publicUrl,
      path: data.path,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Failed to upload file to Supabase Storage.',
    };
  }
}

/**
 * Delete a file from a Supabase Storage bucket.
 */
export async function deleteFileFromSupabase(
  path: string,
  bucket: string = DEFAULT_STORAGE_BUCKET
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase is unconfigured.' };
    }

    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) return { success: false, error: error.message };

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to delete file.' };
  }
}
