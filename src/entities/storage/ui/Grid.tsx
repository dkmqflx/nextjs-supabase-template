import Image from 'next/image';

import { getImageUrl, isImageFile } from '@/shared/lib/images';
import { formatFileSize } from '@/shared/lib/utils';
import dayjs from 'dayjs';
import { FileIcon, Trash2 } from 'lucide-react';

import type { FilesType } from '../api/types';

type GridProps = {
  files: FilesType[];
  onDelete: (storageId: string) => void;
  dict: {
    name: string;
    size: string;
    type: string;
    lastModified: string;
    actions: string;
    delete: string;
    download: string;
    noFiles: string;
  };
};

const Grid = ({ files, onDelete, dict }: GridProps) => {
  if (!files.length) {
    return <p className="text-center text-gray-500 dark:text-gray-400">{dict.noFiles}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="rounded-lg bg-gray-50 p-4 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <div className="relative mb-4 h-40 w-full">
            {isImageFile(file.storageId) ? (
              <Image
                src={getImageUrl(file.storageId)}
                alt={file.originalName}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-md object-contain"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <FileIcon className="h-16 w-16 text-gray-400 dark:text-gray-500" />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1 truncate">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{file.originalName}</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{formatFileSize(Number(file.size))}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {dayjs(file.lastModified).format('YYYY.MM.DD')}
              </p>
            </div>
            <button
              onClick={() => onDelete(file.storageId)}
              className="ml-2 text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400"
              title={dict.delete}
              aria-label={`${dict.delete} ${file.originalName}`}
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Grid;
