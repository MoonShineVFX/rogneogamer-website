import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const LoadingImage = ({ src, alt = "", className = "" }: LoadingImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-full mx-auto relative">
      <AnimatePresence>
        {/* 預設圖片 (剪影) */}
        {isLoading && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            src="https://r2.web.moonshine.tw/msweb/rogneogamer/prototype/c_placeholder.png"
            alt="Loading..."
            className={`absolute inset-0 ${className}`}
          />
        )}
      </AnimatePresence>

      {/* 實際圖片 */}
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default LoadingImage;
