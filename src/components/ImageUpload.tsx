"use client";

import { useState, forwardRef, useImperativeHandle } from 'react';
import Image from 'next/image';
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export type ImageUploadRef = {
  uploadToCloud: () => Promise<string | undefined>;
};

const ImageUpload = forwardRef<ImageUploadRef, ImageUploadProps>(function ImageUpload(props, ref) {
  const [preview, setPreview] = useState<string | null>(props.value || null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
      console.error("Cloudinary configuration is missing");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      props.onChange(data.secure_url);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`mt-4 ${props.className}`}>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-4"
        disabled={isUploading}
      />
      
      {isUploading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <LoadingSpinner className="h-4 w-4 animate-spin" />
          Uploading image...
        </div>
      )}
      
      {preview && (
        <div className="relative w-full h-80 mt-4">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
});

export default ImageUpload;