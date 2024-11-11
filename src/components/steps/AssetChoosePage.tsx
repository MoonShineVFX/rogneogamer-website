import { useAppContext } from "../../context/AppContext";
import { IMAGE_URLS } from "../../helpers/constants";
import { motion } from "framer-motion";

interface AssetChoosePageProps {
  onNext: () => void;
  onPrev: () => void;
}

const AssetChoosePage = ({ onNext, onPrev }: AssetChoosePageProps) => {
  const { selectedAsset, setSelectedAsset } = useAppContext();

  const assets = [
    { id: 0, name: "道具一" },
    { id: 1, name: "道具二" },
    { id: 2, name: "道具三" },
  ];

  const handleNext = () => {
    onNext();
  };

  const handlePrev = () => {
    onPrev();
  };

  return (
    <div
      className="relative h-[100dvh] bg-left-top bg-no-repeat pt-[4%]  flex flex-col justify-between"
      style={{
        backgroundImage: `url('${IMAGE_URLS.ROG_NEO_GAMER + "p4_bg2.png"}')`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="pt-[5%] h-[83%]  mx-auto  flex flex-col justify-center  gap-4 bg-emerald-600/0">
        <div className="flex-1  relative">
          <div className="w-[85%]  mx-auto relative">
            <img
              src={IMAGE_URLS.ROG_NEO_GAMER + "p4_itemborder.png"}
              alt=""
              className="w-full"
            />
            <div className="absolute top-[2%] left-[7.5%] w-[85%] h-[95%] z-40">
              <div className="flex flex-col gap-4 h-full justify-between ">
                {assets.map((asset) => (
                  <motion.div
                    initial={{ opacity: 0, x: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 * asset.id,
                      scale: {
                        duration: 0.2,
                      },
                    }}
                    onClick={() => setSelectedAsset(asset.id)}
                    key={asset.id}
                    className={`relative aspect-[262/120] h-full w-full p-0 cursor-pointer flex items-center justify-center ${
                      selectedAsset === asset.id ? "z-10" : "z-0"
                    }`}
                    animate={{
                      opacity: 1,
                      scale: selectedAsset === asset.id ? 1.1 : 0.95,
                      transition: {
                        duration: 0.3,
                      },
                    }}
                  >
                    <motion.img
                      src={IMAGE_URLS.ROG_NEO_GAMER + "item.png"}
                      alt=""
                      className="w-full max-w-[80px] max-h-full"
                      whileHover={{ opacity: 0.9 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default AssetChoosePage;
