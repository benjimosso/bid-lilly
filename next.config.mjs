/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'iyvaxprhtbubmilkujdr.supabase.co',
              port: ''
            }
        ],
      },
};

export default nextConfig;
