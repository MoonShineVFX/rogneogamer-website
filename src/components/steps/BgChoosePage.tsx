import { motion } from "framer-motion";
import { useAppContext } from "../../context/AppContext";
import { IMAGE_URLS } from "../../helpers/constants";
import useIsMobile from "../../hooks/useIsMobile";
interface BgChoosePageProps {
  onNext: () => void;
  onPrev: () => void;
  isDesktop?: boolean;
}

const BgChoosePage = ({ onNext, onPrev }: BgChoosePageProps) => {
  const { selectedBg, selectedSeries, selectedAsset, setSelectedBg } =
    useAppContext();
  const isMobile = useIsMobile();

  // 根據選擇的 series 生成兩個背景選項
  const bgOptions = [
    {
      id: `s${selectedSeries}_1A0${selectedAsset}`,
      url: `${IMAGE_URLS.ROG_NEO_GAMER}bg/s${selectedSeries}_1A0${selectedAsset}.png`,
    },
    {
      id: `s${selectedSeries}_2A0${selectedAsset}`,
      url: `${IMAGE_URLS.ROG_NEO_GAMER}bg/s${selectedSeries}_2A0${selectedAsset}.png`,
    },
  ];

  return (
    <div
      className="relative h-[100dvh] bg-left-top bg-no-repeat pt-[4%]  flex flex-col justify-between lg:justify-start"
      style={{
        backgroundImage: `url('${
          IMAGE_URLS.ROG_NEO_GAMER + "desktop_bg.png"
        }')`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="absolute top-0 left-0 text-white/50 text-sm z-10">
        {"s" + selectedSeries + "_1A0" + selectedAsset}
      </div>
      <div className="relative flex  h-[38px] w-full ">
        <div className="text-center text-white font-rog text- xl font-bold flex items-center justify-start gap-4 absolute top-0 left-0 pl-[5%] pt-[1%]   ">
          BACKGROUND{" "}
        </div>
        <div className="  ml-auto ">
          <img
            src={`${IMAGE_URLS.ROG_NEO_GAMER + "c_titleborder01.png"}`}
            alt=""
          />
        </div>
      </div>
      {/* 背景選擇區域 */}
      <div className="relative z-10 container mx-auto px-4 py-[8%]">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
          {bgOptions.map((bg, index) => (
            <motion.div
              key={bg.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: selectedBg === bg.id ? 1.05 : 1,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.5,
              }}
              onClick={() => setSelectedBg(bg.id)}
              className={`
                bg-white/10 
                aspect-[16/9] 
                cursor-pointer 
                hover:brightness-125
                transition-all
                duration-300
                ${selectedBg === bg.id ? "ring-2 ring-red-500 scale-105" : ""}
              `}
            >
              <img
                src={bg.url}
                alt={`Background ${index + 1}`}
                className="w-full h-full object-cover rounded-lg "
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Next/Prev 按鈕 */}
      {isMobile ? (
        <div className="w-full pt-[5%] h-[12%]  bottom-0">
          <div className="flex justify-between w-[60%] mx-auto h-full bg-violet-600/0 relative">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0, y: "0%" }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="top-1/2 left-0 z-40 h-10 flex items-center"
            >
              <button
                onClick={onPrev}
                className="h-full w-[100%] aspect-[90/40] bg-contain bg-left-top bg-no-repeat flex items-center justify-center hover:scale-95 font-cachet font-bold text-white/80"
                style={{
                  backgroundImage: `url('${IMAGE_URLS.ROG_GAMER_CARD}/images/redbutton_bg2.png')`,
                }}
              >
                Back
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0, y: "0%" }}
              exit={{ opacity: 0, x: -100 }}
              className="top-1/2 right-0 z-40 h-10 flex items-center"
            >
              <button
                onClick={onNext}
                className="h-full w-[100%] aspect-[90/40] bg-contain bg-left-top bg-no-repeat flex items-center justify-center hover:scale-95 font-cachet font-bold text-white/80"
                style={{
                  backgroundImage: `url('${IMAGE_URLS.ROG_GAMER_CARD}/images/redbutton_bg2.png')`,
                }}
              >
                Next
              </button>
            </motion.div>
            <div className="h-[5vh] w-[1px] bg-white/70 absolute bottom-0 left-1/2 -translate-x-1/2"></div>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default BgChoosePage;
