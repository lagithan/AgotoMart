import { v2 as cloudinaryV2 } from 'cloudinary';

cloudinaryV2.config({
  cloud_name: 'dgihkeczq', // Wrap in quotes
  api_key: '544725424315599', // Wrap in quotes
  api_secret: 'C9k6lv-FSyhDIH749aPLKnMHiJY' // Wrap in quotes
});

export { cloudinaryV2 as cloudinary };
