import { formatFileSize } from '@/shared/lib/utils';
import { FileIcon, ImageIcon, Trash2 } from 'lucide-react';

import { FileObject } from '../api/types';

const Table = ({ files }: { files: FileObject[] }) => {
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
                  {(file.metadata?.mimetype as string)?.includes('image') ? (
                    <ImageIcon className="mr-3 h-5 w-5 text-gray-400" />
                  ) : (
                    <FileIcon className="mr-3 h-5 w-5 text-gray-400" />
                  )}
                  <span className="text-sm font-medium text-gray-900">{file.name}</span>
                </div>
              </td>

              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {formatFileSize(Number(file.metadata?.size))}
              </td>

              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {new Date(file.created_at).toLocaleDateString()}
              </td>

              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <button className="text-red-600 hover:text-red-900">
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
