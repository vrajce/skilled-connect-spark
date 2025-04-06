import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
  api_secret: import.meta.env.VITE_CLOUDINARY_API_SECRET
});

export const generateSignature = (folder: string = 'provider-profiles') => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: folder,
      allowed_formats: 'jpg,png,jpeg,webp'
    },
    import.meta.env.VITE_CLOUDINARY_API_SECRET
  );

  return {
    timestamp,
    signature,
    folder,
    apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  };
};
