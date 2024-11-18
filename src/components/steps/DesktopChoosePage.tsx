import { motion } from "framer-motion";
import { useAppContext } from "../../context/AppContext";
import { IMAGE_URLS } from "../../helpers/constants";
import SeriesChoosePage from "./SeriesChoosePage";
import StyleChoosePage from "./StyleChoosePage";
import AssetChoosePage from "./AssetChoosePage";
import { useState, useRef, MouseEvent } from "react";

interface DesktopChoosePageProps {
  onNext: () => void;
  onPrev: () => void;
}

// 定義選擇類型
type ChooseType = "series" | "style" | "asset" | null;

const DesktopChoosePage = ({ onNext, onPrev }: DesktopChoosePageProps) => {
  const { selectedSeries, selectedStyle, selectedAsset } = useAppContext();
  const [currentChoose, setCurrentChoose] = useState<ChooseType>("series");

  // 檢查是否可以進入下一步
  const canProceed =
    selectedSeries !== null && selectedStyle !== null && selectedAsset !== null;

  // 處理卡片點擊
  const handleCardClick = (type: ChooseType) => {
    if (
      type === "series" ||
      (type === "style" && selectedSeries !== null) ||
      (type === "asset" && selectedStyle !== null)
    ) {
      setCurrentChoose(type);
    }
  };

  const getCardStyle = (type: ChooseType) => {
    const basePositions = {
      series: "-145%", // 左側固定位置
      style: "-50%", // 中間固定位置
      asset: "45%", // 右側固定位置
    };

    // 計算基礎縮放比例
    const getBaseScale = (cardType: ChooseType) => {
      if (currentChoose === cardType) {
        return 0.9; // 當前選中的最大
      }

      // 根據當前選中項目決定其他卡片的大小
      switch (currentChoose) {
        case "series":
          return 0.8; // style 中等，asset 最小
        case "style":
          return 0.8;
        case "asset":
          return 0.8;
        default:
          return 0.9;
      }
    };

    // 計算 z-index
    let zIndex = 1;
    if (currentChoose === type) {
      zIndex = 30; // 當前選中的在最上層
    } else if (type === "series") {
      zIndex = 20; // series 次層
    } else if (type === "style") {
      zIndex = 10; // style 第三層
    } else {
      zIndex = 1; // asset 最底層
    }

    return {
      scale: getBaseScale(type),
      x: basePositions[type],
      y: "-10%",
      opacity: 1,
      zIndex,
    };
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* 背景元素 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${
            IMAGE_URLS.ROG_NEO_GAMER + "desktop_bg.png"
          }')`,
        }}
      />

      {/* 調整主要內容區域 - 使用固定寬度並居中 */}
      <div className="relative z-10 h-screen flex items-center justify-center">
        <div className="relative w-[1200px] h-[80vh]">
          {/* Asset 卡片 (最底層) */}
          <motion.div
            initial={{ x: 1000, opacity: 0 }}
            animate={getCardStyle("asset")}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={() => handleCardClick("asset")}
            className={`w-[37%]  overflow-y-hidden absolute left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-sm rounded-lg  transition-colors duration-300
              ${
                selectedStyle === null
                  ? "opacity-50 pointer-events-none grayscale"
                  : "cursor-pointer"
              }
              ${
                currentChoose === "asset"
                  ? "grayscale-0"
                  : "grayscale hover:grayscale-0 blur-sm hover:blur-none hover:scale-105 transition-all duration-300 hover:border-2 hover:border-red-800"
              }
              ${selectedAsset !== null ? "border-2 border-red-500" : ""}`}
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.1s ease-out",
            }}
          >
            <div className="h-fu">
              <AssetChoosePage
                onNext={() => {}}
                onPrev={() => {}}
                isDesktop={true}
              />
            </div>
          </motion.div>

          {/* Style 卡片 (中間層) */}
          <motion.div
            initial={{ x: 0, opacity: 0 }}
            animate={getCardStyle("style")}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={() => handleCardClick("style")}
            className={`w-[37%]  overflow-y-hidden  absolute left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-sm rounded-lg  transition-colors duration-300
              ${
                selectedSeries === null
                  ? "opacity-50 pointer-events-none grayscale"
                  : "cursor-pointer"
              }
              ${
                currentChoose === "style"
                  ? "grayscale-0"
                  : "grayscale hover:grayscale-0 blur-sm hover:blur-none transition-all duration-300 hover:border-2 hover:border-red-800"
              }
              ${selectedStyle !== null ? "border-2 border-red-500" : ""}`}
          >
            <div className="h-full">
              <StyleChoosePage
                onNext={() => {}}
                onPrev={() => {}}
                isDesktop={true}
              />
            </div>
          </motion.div>

          {/* Series 卡片 (最上層) */}
          <motion.div
            initial={{ x: -1400, opacity: 0 }}
            animate={getCardStyle("series")}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={() => handleCardClick("series")}
            className={`w-[37%]  overflow-y-hidden   absolute left-1/2 -translate-x-1/2 bg-black/30 
              backdrop-blur-sm rounded-lg  transition-all duration-300 cursor-pointer
              hover:shadow-2xl
              ${
                currentChoose === "series"
                  ? "grayscale-0"
                  : "grayscale hover:grayscale-0"
              }
              ${selectedSeries === null ? "" : "border-2 border-red-500"}`}
          >
            <div className="h-full">
              <SeriesChoosePage
                onNext={() => {}}
                onPrev={() => {}}
                isDesktop={true}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* 導航按鈕 */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0, y: "-50%" }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="absolute    top-1/2  left-0 z-40 w-[10%] flex items-center "
      >
        <div className="h-[1px] w-[3vw] bg-white/70 mr-1"></div>
        <button
          onClick={onPrev}
          className="h-full w-[50%] aspect-[90/40] bg-contain bg-left-top bg-no-repeat flex items-center justify-center hover:scale-95 font-cachet font-bold text-white/80"
          style={{
            backgroundImage: `url('${IMAGE_URLS.ROG_GAMER_CARD}/images/redbutton_bg2.png')`,
          }}
        >
          Back
        </button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0, y: "-50%" }}
        exit={{ opacity: 0, x: -100, y: "50%" }}
        className="absolute top-1/2 right-0 z-40 w-[10%] flex items-center "
      >
        <button
          onClick={onNext}
          className="h-full w-[50%] ml-auto aspect-[90/40] bg-contain bg-left-top bg-no-repeat flex items-center justify-center hover:scale-95 font-cachet font-bold text-white/80"
          style={{
            backgroundImage: `url('${IMAGE_URLS.ROG_GAMER_CARD}/images/redbutton_bg2.png')`,
          }}
        >
          Next
        </button>
        <div className="h-[1px] w-[3vw] bg-white/70 ml-1"></div>
      </motion.div>
    </div>
  );
};

export default DesktopChoosePage;
