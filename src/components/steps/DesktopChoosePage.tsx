import { motion } from "framer-motion";
import { useAppContext } from "../../context/AppContext";
import { IMAGE_URLS } from "../../helpers/constants";
import SeriesChoosePage from "./SeriesChoosePage";
import StyleChoosePage from "./StyleChoosePage";
import AssetChoosePage from "./AssetChoosePage";
import { useState } from "react";

interface DesktopChoosePageProps {
  onNext: () => void;
  onPrev: () => void;
}

// 定義選擇類型
type ChooseType = "series" | "style" | "asset";

const DesktopChoosePage = ({ onNext, onPrev }: DesktopChoosePageProps) => {
  const {
    selectedSeries,
    selectedAsset,
    selectedAppearance,
    selectedGender,
    selectedClothing,
  } = useAppContext();
  const [currentChoose, setCurrentChoose] = useState<ChooseType>("series");

  // 處理卡片點擊
  const handleCardClick = (type: ChooseType) => {
    setCurrentChoose(type);
  };

  const getCardStyle = (type: ChooseType) => {
    const basePositions = {
      series: "-145%", // 左側固定位置
      style: "-50%", // 中間固定位置
      asset: "45%", // 右側固定位置
    } as const; // 添加 as const 來確保類型

    // 如果 type 是 null，返回默認樣式
    if (type === null) {
      return {
        scale: 0.9,
        x: "0%",
        y: "-10%",
        opacity: 1,
        zIndex: 1,
      };
    }

    // 計算基礎縮放比例
    const getBaseScale = (cardType: ChooseType) => {
      if (currentChoose === cardType) {
        return 0.9; // 當前選中的最大
      }

      // 根據當前選中項目決定其他卡片的大小
      switch (currentChoose) {
        case "series":
          return 0.8;
        case "style":
          return 0.8;
        case "asset":
          return 0.8;
        default:
          return 0.8;
      }
    };

    // 計算 z-index
    let zIndex = 1;
    if (currentChoose === type) {
      zIndex = 30;
    } else if (type === "series") {
      zIndex = 20;
    } else if (type === "style") {
      zIndex = 10;
    }

    return {
      scale: getBaseScale(type),
      x: basePositions[type], // 現在 type 已經確定不是 null
      y: "-10%",
      opacity: 1,
      zIndex,
    };
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 text-white/50 text-sm z-10 hidden">
        {"S" +
          selectedSeries +
          selectedGender +
          selectedAppearance +
          "C0" +
          selectedClothing +
          "-A" +
          selectedAsset}
      </div>
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
        <div className="relative w-[1200px] 2xl:w-[66%] h-[80vh] 2xl:h-[70vh]">
          {/* Style 卡片 (中間層) */}
          <motion.div
            initial={{ x: 0, opacity: 0 }}
            animate={getCardStyle("style")}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={() => handleCardClick("style")}
            className={`w-[37%] 2xl:w-[42%]  overflow-y-hidden   absolute left-1/2 -translate-x-1/2 bg-black/30 
              backdrop-blur-sm rounded-lg  transition-all duration-300 cursor-pointer
              hover:shadow-2xl
              ${
                currentChoose === "style"
                  ? "grayscale-0 border-2 border-red-500"
                  : "grayscale hover:grayscale-0 blur-sm hover:blur-none transition-all duration-300 hover:border-2 hover:border-red-800"
              }
             `}
          >
            <div className="h-full">
              <StyleChoosePage
                onNext={() => {}}
                onPrev={() => {}}
                isDesktop={true}
              />
            </div>
          </motion.div>

          {/* Asset 卡片 (最底層) */}
          <motion.div
            initial={{ x: 1000, opacity: 0 }}
            animate={getCardStyle("asset")}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={() => handleCardClick("asset")}
            className={`w-[37%] 2xl:w-[42%]  overflow-y-hidden   absolute left-1/2 -translate-x-1/2 bg-black/30 
              backdrop-blur-sm rounded-lg  transition-all duration-300 cursor-pointer
              hover:shadow-2xl
              ${
                currentChoose === "asset"
                  ? "grayscale-0 border-2 border-red-500"
                  : "grayscale hover:grayscale-0 blur-sm hover:blur-none transition-all duration-300 hover:border-2 hover:border-red-800"
              }
              `}
          >
            <div className="h-fu">
              <AssetChoosePage
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
            className={`w-[37%] 2xl:w-[42%]  overflow-y-hidden   absolute left-1/2 -translate-x-1/2 bg-black/30 
              backdrop-blur-sm rounded-lg  transition-all duration-300 cursor-pointer
              hover:shadow-2xl
              ${
                currentChoose === "series"
                  ? "grayscale-0 border-2 border-red-500"
                  : "grayscale hover:grayscale-0 blur-sm hover:blur-none hover:scale-105 transition-all duration-300 hover:border-2 hover:border-red-800"
              }
              `}
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
