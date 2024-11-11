import { useState, useEffect } from "react";

interface WindowSize {
  width: number;
  height: number;
}

export const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // 處理 resize 事件的函數
    const handleResize = () => {
      // 更新視窗大小
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // 更新 CSS 變數
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };

    // 初始化
    handleResize();

    // 添加事件監聽
    window.addEventListener("resize", handleResize);

    // 清理函數
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};
