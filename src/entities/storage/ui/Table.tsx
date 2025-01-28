import { formatFileSize } from '@/shared/lib/utils';
import dayjs from 'dayjs';
import { FileIcon, ImageIcon, Trash2 } from 'lucide-react';

import type { FilesType } from '../api/types';

const Table = ({ files, onDelete }: { files: FilesType[]; onDelete: (storageId: string) => void }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Size</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {files.map((file) => (
            <tr key={file.id}>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center">
                  {file.storageId.includes('image') ? (
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
                <button onClick={() => onDelete(file.storageId)} className="text-red-600 hover:text-red-900">
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
