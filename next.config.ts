import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://i.pinimg.com/**"), new URL("https://files.raycast.com/80agl1c92uiqo6jg7t2cfol90xbc"), new URL("https://images.icon-icons.com/2406/PNG/512/spinner_icon_145934.png"), new URL("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKWT7CDoUicx4RlFuP854-TMRzLEudLtfrCGxApluQFJIz6w4q6-7K2cEU&s=10")]
  }
};

export default nextConfig;
