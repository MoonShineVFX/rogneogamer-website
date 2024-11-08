import { useState, useEffect } from "react";

const useIsMobile = (breakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 初始檢查
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // 立即執行一次
    checkIsMobile();

    // 監聽視窗大小變化
    window.addEventListener("resize", checkIsMobile);

    // 清理監聽器
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
