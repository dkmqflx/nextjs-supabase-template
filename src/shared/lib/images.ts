export function getImageUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${path}`;
}

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];

export const isImageFile = (filename: string): boolean => {
  const extension = filename.toLowerCase();
  return IMAGE_EXTENSIONS.some((ext) => extension.endsWith(ext));
};
