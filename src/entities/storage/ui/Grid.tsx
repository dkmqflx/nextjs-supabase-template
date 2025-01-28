import { formatFileSize } from '@/shared/lib/utils';
import dayjs from 'dayjs';
import { FileIcon, ImageIcon, Trash2 } from 'lucide-react';

import type { FilesType } from '../api/types';

const Grid = ({ files, onDelete }: { files: FilesType[]; onDelete: (storageId: string) => void }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {files.map((file) => (
        <div key={file.id} className="rounded-lg bg-gray-50 p-4">
          <div className="mb-2 flex items-start justify-between">
            {file.storageId.includes('image') ? (
              <ImageIcon className="mr-3 h-5 w-5 text-gray-400" />
            ) : (
              <FileIcon className="mr-3 h-5 w-5 text-gray-400" />
            )}
            <button onClick={() => onDelete(file.storageId)} className="text-red-600 hover:text-red-900">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          <p className="truncate text-sm font-medium text-gray-900">{file.originalName}</p>
          <p className="mt-1 text-xs text-gray-500">{formatFileSize(Number(file.size))}</p>
          <p className="text-xs text-gray-500"> {dayjs(file.lastModified).format('YYYY.MM.DD')}</p>
        </div>
      ))}
    </div>
  );
};

export default Grid;
