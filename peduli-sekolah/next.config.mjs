/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dvvwmhgbq",
        NEXT_PUBLIC_CLOUDINARY_PRESET_NAME: "xqdlllqf"
    },
    images: {
        domains: ["res.cloudinary.com"],
    }
};

export default nextConfig;
