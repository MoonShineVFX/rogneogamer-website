// import { useAppContext } from "../../context/AppContext";
import { IMAGE_URLS } from "../../helpers/constants";
import { motion } from "framer-motion";
import useIsMobile from "../../hooks/useIsMobile";
interface DownloadPageProps {
  onPrev: () => void;
  onNext: () => void;
}

const DownloadPage = ({ onPrev, onNext }: DownloadPageProps) => {
  // 移除未使用的解構
  // const { resultImages } = useAppContext();
  const isMobile = useIsMobile();
  return (
    <div
      className="relative h-[100dvh] bg-left-top bg-no-repeat pt-[4%]  flex flex-col justify-between lg:justify-start"
      style={{
        backgroundImage: `url('${IMAGE_URLS.ROG_NEO_GAMER + "c_bg02.png"}')`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="relative flex  h-[38px] w-full ">
        <div className="text-center text-white font-rog text-xl font-bold flex items-center justify-start gap-4 absolute top-0 left-0 pl-[5%] pt-[1%]   ">
          DOWNLOAD{" "}
        </div>
        <div className="  ml-auto ">
          <img
            src={`${IMAGE_URLS.ROG_NEO_GAMER + "c_titleborder01.png"}`}
            alt=""
          />
        </div>
      </div>
      <div className="px-[6%] lg:px-[10%] h-[86%] lg:h-auto  lg:w-[100%]   mx-auto   flex flex-col lg:flex-row justify-center pt-[4%] lg:pt-[10%] gap-4 lg:gap-8">
        {/* 第一張橫向圖片 */}
        <div className="w-full  lg:w-[65%]   relative   aspect-video  ">
          <img
            src={IMAGE_URLS.ROG_NEO_GAMER + "p7_b1.png"}
            alt=""
            className="w-full h-full object-contain"
          />
          <div className="absolute top-0 left-0 w-full h-full px-4 py-3 -mt-1 lg:px-[8%]   ">
            <img
              src={`${IMAGE_URLS.ROG_NEO_GAMER}p5_img1.png`}
              alt="預覽 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-[5%] left-1/2 -translate-x-1/2   z-20 flex items-center gap-2">
            <img
              src={`${IMAGE_URLS.ROG_NEO_GAMER}dl_icon.png`}
              className="w-full"
            />
            <p className="text-white/80 text-center">Wallpaper</p>
          </div>
        </div>

        {/* 兩張直向圖片並排 */}
        <div className="flex gap-4 h-auto w-full lg:w-1/2 lg:h-full aspect-[4/3] ">
          <div className="w-1/2  bg-red-800/0  relative">
            <img
              src={IMAGE_URLS.ROG_NEO_GAMER + "p7_b2.png"}
              alt=""
              className="w-full h-full object-contain"
            />
            <div className="absolute top-0 left-0 w-full h-full px-3 py-4 -mt-1 lg:px-[9%] ">
              <img
                src={`${IMAGE_URLS.ROG_NEO_GAMER}p5_img2.png`}
                alt="預覽 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-[6%] left-1/2 -translate-x-1/2   z-20 flex items-center gap-2">
              <img
                src={`${IMAGE_URLS.ROG_NEO_GAMER}dl_icon.png`}
                className="w-full"
              />
              <p className="text-white/80 text-center">Phone</p>
            </div>
          </div>
          <div className="w-1/2 bg-red-800/0  relative">
            <img
              src={IMAGE_URLS.ROG_NEO_GAMER + "p7_b2.png"}
              alt=""
              className="w-full h-full object-contain"
            />
            <div className="absolute top-0 left-0 w-full h-full px-3 py-4 -mt-1 lg:px-[9%] ">
              <img
                src={`${IMAGE_URLS.ROG_NEO_GAMER}p5_img2.png`}
                alt="預覽 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-[6%] left-1/2 -translate-x-1/2   z-20 flex items-center gap-2">
              <img
                src={`${IMAGE_URLS.ROG_NEO_GAMER}dl_icon.png`}
                className="w-full"
              />
              <p className="text-white/80 text-center">Dnamic</p>
            </div>
          </div>
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

export default DownloadPage;
