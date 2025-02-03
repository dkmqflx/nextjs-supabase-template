'use client';

import { Download } from 'lucide-react';
import { toast } from 'sonner';

type DownloadProps = {
  url: string;
  filename: string;
};

export const DownloadButton = ({ url, filename }: DownloadProps) => {
  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = `${filename || 'image'}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(objectUrl);
      document.body.removeChild(a);
      toast.success('Image downloaded successfully');
    } catch (error) {
      console.warn(error);
      toast.error('Failed to download image');
    }
  };

  return (
    <button onClick={handleDownload} className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
      <Download className="h-5 w-5" />
    </button>
  );
};
