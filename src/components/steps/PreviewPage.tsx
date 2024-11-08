import { useAppContext } from "../../context/AppContext";
import { IMAGE_URLS } from "../../helpers/constants";
import { motion } from "framer-motion";

interface PreviewPageProps {
  onNext: () => void;
  onPrev: () => void;
}

const PreviewPage = ({ onNext, onPrev }: PreviewPageProps) => {
  const { previewImages } = useAppContext();

  return (
    <div
      className="relative h-[100dvh] bg-left-top bg-no-repeat"
      style={{
        backgroundImage: `url('${IMAGE_URLS.ROG_NEO_GAMER + "p5_bg2.png"}')`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="w-[85%] mx-auto pt-[25%]">
        {/* 第一張橫向圖片 */}
        <div className="w-full  mb-10 bg-red-800/0 rounded overflow-hidden relative">
          <img
            src={IMAGE_URLS.ROG_NEO_GAMER + "p5_b1.png"}
            alt=""
            className="w-full h-full object-contain"
          />
          <div className="absolute top-0 left-0 w-full h-full px-4 py-3 -mt-1">
            <img
              src={`${IMAGE_URLS.ROG_NEO_GAMER}p5_img1.png`}
              alt="預覽 1"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 兩張直向圖片並排 */}
        <div className="flex gap-4">
          <div className="w-1/2  bg-red-800/0 rounded overflow-hidden relative">
            <img
              src={IMAGE_URLS.ROG_NEO_GAMER + "p5_b2.png"}
              alt=""
              className="w-full h-full object-contain"
            />
            <div className="absolute top-0 left-0 w-full h-full px-3 py-4 -mt-1">
              <img
                src={`${IMAGE_URLS.ROG_NEO_GAMER}p5_img2.png`}
                alt="預覽 1"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-1/2 bg-red-800/0 rounded overflow-hidden relative">
            <img
              src={IMAGE_URLS.ROG_NEO_GAMER + "p5_b3.png"}
              alt=""
              className="w-full h-full object-contain"
            />
            <div className="absolute top-0 left-0 w-full h-full px-3 py-4 -mt-1">
              <img
                src={`${IMAGE_URLS.ROG_NEO_GAMER}p5_img2.png`}
                alt="預覽 1"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Next/Prev 按鈕 */}
      <div className="w-full pt-[7%] h-[15dvh] fixed bottom-0">
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
    </div>
  );
};

export default PreviewPage;
