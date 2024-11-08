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
      className="relative h-[100dvh] bg-left-top bg-no-repeat "
      style={{
        backgroundImage: `url('${IMAGE_URLS.ROG_NEO_GAMER + "p4_bg2.png"}')`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className=" pt-[25%]  relative ">
        <div className="w-[82%] mx-auto relative">
          <img
            src={IMAGE_URLS.ROG_NEO_GAMER + "p4_itemborder.png"}
            alt=""
            className="w-full"
          />
          <div className="absolute top-[2%] left-[7.5%] w-[85%] h-[95%]">
            <div className="flex flex-col gap-4 h-full justify-between ">
              {assets.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset.id)}
                  className={`relative aspect-[262/120] h-full  w-full p-0 cursor-pointer transition-transform duration-300 flex items-center justify-center bg-lime-600/0 ${
                    selectedAsset === asset.id ? "scale-105" : "scale-100"
                  }`}
                >
                  <img
                    src={IMAGE_URLS.ROG_NEO_GAMER + "item.png"}
                    alt=""
                    className="w-full  max-w-[80px] max-h-full hover:opacity-90 transition-opacity flex items-center justify-center"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/80 font-rog tracking-wider">
                      {asset.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
              onClick={handlePrev}
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
              onClick={handleNext}
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
