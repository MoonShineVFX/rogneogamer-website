import { useAppContext } from "../../context/AppContext";
import { IMAGE_URLS } from "../../helpers/constants";
import { motion } from "framer-motion";

interface AssetChoosePageProps {
  onNext: () => void;
  onPrev: () => void;
  isDesktop: boolean;
}

const ASSET_TITLES = {
  "1": {
    "1": "Modding Lab",
    "2": "Trendy Creation Lab",
  },
  "2": {
    "1": "Racing Speedsters",
    "2": "Sports Collectibles",
  },
  "3": {
    "1": "Anime Collectibles",
    "2": "Space Mecha",
  },
} as const;

const AssetChoosePage = ({
  onNext,
  onPrev,
  isDesktop,
}: AssetChoosePageProps) => {
  const { selectedSeries, selectedAsset, setSelectedAsset } = useAppContext();

  // 直接生成當前系列的道具選項
  const currentAssets = selectedSeries
    ? [
        {
          id: "1",
          name: `S${selectedSeries}A1`,
          title: `${ASSET_TITLES[selectedSeries as "1" | "2" | "3"]["1"]}`,
        },
        {
          id: "2",
          name: `S${selectedSeries}A2`,
          title: `${ASSET_TITLES[selectedSeries as "1" | "2" | "3"]["2"]}`,
        },
      ]
    : [];

  return (
    <div
      className="relative h-[100dvh] xl:h-[98dvh] 2xl:h-[90dvh] 4xl:h-[77dvh] bg-left-top bg-no-repeat pt-[4%]  flex flex-col justify-between "
      style={{
        backgroundImage: `url('${IMAGE_URLS.ROG_NEO_GAMER + "c_bg03.png"}')`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="relative flex  h-[38px] w-full ">
        <div className="text-center text-white font-rog text-base 4xl:text-xl font-bold flex items-center justify-start gap-4 absolute top-0 left-0 pl-[5%] pt-[1%]  uppercase  ">
          Gaming Setup​{" "}
        </div>
        <div className="  ml-auto ">
          <img
            src={`${IMAGE_URLS.ROG_NEO_GAMER + "c_titleborder01.png"}`}
            alt=""
          />
        </div>
      </div>
      <div className=" h-full  mx-auto  flex flex-col justify-center items-center w-[90%]  gap-4 bg-emerald-600/0">
        <div className=" w-[88%] lg:w-[95%]  mx-auto relative bg-slate-20/0">
          <img
            src={IMAGE_URLS.ROG_NEO_GAMER + "asset_edge.png"}
            alt=""
            className="w-full"
          />
          <div className="absolute top-0 left-0 w-[100%] h-[95%] z-40 ">
            <div className="flex flex-col gap-4 h-full justify-evenly ">
              {currentAssets.map((asset) => (
                <div
                  onClick={() => setSelectedAsset(asset.id as "1" | "2")}
                  key={asset.id}
                  className={`relative aspect-[368/173]  w-full p-0 cursor-pointer flex items-center justify-center bg-contain bg-left-top bg-no-repeat ${
                    selectedAsset === asset.id ? "z-10" : "z-0"
                  }`}
                  style={{
                    backgroundImage: `url('${
                      IMAGE_URLS.ROG_NEO_GAMER + "asset_b.png"
                    }')`,
                    backgroundSize: "100% 100%",
                  }}
                >
                  <motion.img
                    src={IMAGE_URLS.ROG_NEO_GAMER + `Assets/${asset.name}.jpg`}
                    alt=""
                    className={`w-[55%] max-w-full max-h-full transition-all duration-300 ${
                      selectedAsset === asset.id ? "scale-100" : "scale-90"
                    }`}
                  />
                  <div className="absolute -bottom-[10%] left-0 w-full h-[10%] bg-red-500/0 text-white/80 text-center flex items-center justify-center font-robotocon">
                    {asset.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {!isDesktop && (
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
      )}
    </div>
  );
};

export default AssetChoosePage;
