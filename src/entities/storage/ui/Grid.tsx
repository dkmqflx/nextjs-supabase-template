import { formatFileSize } from '@/shared/lib/utils';
import { FileIcon, ImageIcon, Trash2 } from 'lucide-react';

import { FileObject } from '../api/types';

const Grid = ({ files }: { files: FileObject[] }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {files.map((file) => (
        <div key={file.id} className="rounded-lg bg-gray-50 p-4">
          <div className="mb-2 flex items-start justify-between">
            {(file.metadata?.mimetype as string)?.includes('image') ? (
              <ImageIcon className="mr-3 h-5 w-5 text-gray-400" />
            ) : (
              <FileIcon className="mr-3 h-5 w-5 text-gray-400" />
            )}
            <button className="text-red-600 hover:text-red-900">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          <p className="truncate text-sm font-medium text-gray-900">{file.name}</p>
          <p className="mt-1 text-xs text-gray-500">{formatFileSize(Number(file.metadata?.size))}</p>
          <p className="text-xs text-gray-500"> {new Date(file.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Grid;
