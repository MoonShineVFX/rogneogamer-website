import React, { createContext, useContext, useState, ReactNode } from "react";

// 定義 Context 的型別
interface ImageContextType {
  beforeImage: string | null;
  setBeforeImage: React.Dispatch<React.SetStateAction<string | null>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

// 建立 Context
const ImageContext = createContext<ImageContextType | undefined>(undefined);

// 自定義 Hook
export function useImage(): ImageContextType {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImage must be used within an ImageProvider");
  }
  return context;
}

// Provider Props 型別
interface ImageProviderProps {
  children: ReactNode;
}

// Provider 組件
export function ImageProvider({ children }: ImageProviderProps) {
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");

  return (
    <ImageContext.Provider
      value={{
        beforeImage,
        setBeforeImage,
        username,
        setUsername,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}
