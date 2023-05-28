'use client';

import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

// declare global {
//   var cloudinary: any;
// }

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

type InfoRestUploadType = {
  access_mode: string;
  asset_id: string;
  batchId: string;
  bytes: number;
  created_at: string;
  etag: string;
  folder: string;
  format: string;
  height: 978;
  id: string;
  original_filename: string;
  path: string;
  placeholder: false;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: [];
  thumbnail_url: string;
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
};

interface IResultUpload {
  event: 'string';
  info: InfoRestUploadType;
}

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const handleUpload = (res: IResultUpload) => {
    onChange(res.info.secure_url);
  };

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset='upload'
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className='relative flex flex-col items-center justify-center gap-4 p-20 transition border-2 border-dashed cursor-pointer hover:opacity-70 bg-neutral-300 text-neutral-600'
          >
            <TbPhotoPlus size={50} />
            <div className='text-lg font-semibold'>Click to upload</div>
            {value && (
              <div className='absolute inset-0 w-full h-full'>
                <Image
                  alt='upload img'
                  fill
                  style={{ objectFit: 'cover' }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
