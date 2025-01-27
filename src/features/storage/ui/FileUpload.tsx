'use client';

import { useCallback } from 'react';

import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

import { useUploadFile } from '../api/query';

const FileUpload = () => {
  const { mutate: uploadFile } = useUploadFile();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const formData = new FormData();

        acceptedFiles.forEach((file: File) => {
          const encodedFileName = encodeURIComponent(file.name);
          const modifiedFile = new File([file], encodedFileName, {
            type: file.type,
            lastModified: file.lastModified,
          });

          formData.append(encodedFileName, modifiedFile);
        });

        uploadFile(formData);
      }
    },
    [uploadFile],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <div className="mb-8 cursor-pointer" {...getRootProps()}>
      <input
        {...getInputProps()}
        type="file"
        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.csv"
        multiple
      />

      <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-4 text-sm text-gray-600">Drag your files here or browse</p>
        <p className="mt-1 text-xs text-gray-500">Support for a wide range of file types. Max file size 10MB.</p>
      </div>
    </div>
  );
};

export default FileUpload;
