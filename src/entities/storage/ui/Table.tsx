import { isImageFile } from '@/shared/lib/images';
import { formatFileSize } from '@/shared/lib/utils';
import dayjs from 'dayjs';
import { FileIcon, ImageIcon, Trash2 } from 'lucide-react';

import type { FilesType } from '../api/types';

type TableProps = {
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

const Table = ({ files, onDelete, dict }: TableProps) => {
  if (!files.length) {
    return <p className="text-center text-gray-500">{dict.noFiles}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              {dict.name}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              {dict.size}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              {dict.lastModified}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              {dict.actions}
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {files.map((file) => (
            <tr key={file.id}>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center">
                  {isImageFile(file.storageId) ? (
                    <ImageIcon className="mr-3 h-5 w-5 text-gray-400" />
                  ) : (
                    <FileIcon className="mr-3 h-5 w-5 text-gray-400" />
                  )}
                  <span className="text-sm font-medium text-gray-900">{file.originalName}</span>
                </div>
              </td>

              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{formatFileSize(Number(file.size))}</td>

              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {dayjs(file.lastModified).format('YYYY.MM.DD')}
              </td>

              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <button
                  onClick={() => onDelete(file.storageId)}
                  className="text-red-600 hover:text-red-900"
                  title={dict.delete}
                  aria-label={`${dict.delete} ${file.originalName}`}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
