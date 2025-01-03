import { AnimatePresence, motion } from "framer-motion";
import { IMAGE_URLS, SERIES_DATA } from "../../helpers/constants";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";
interface SeriesChoosePageProps {
  onNext: () => void;
  onPrev: () => void;
  isDesktop: boolean;
}

const SeriesChoosePage = ({
  onNext,
  onPrev,
  isDesktop,
}: SeriesChoosePageProps) => {
  const { selectedSeries, setSelectedSeries } = useAppContext();

  const handleNext = () => {
    onNext();
  };

  const handlePrev = () => {
    onPrev();
  };
  useEffect(() => {
    const fixScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.style.height = "100%";
    };

    // 頁面切換時
    fixScroll();

    // 監聽滾動事件
    window.addEventListener("scroll", fixScroll);

    return () => {
      window.removeEventListener("scroll", fixScroll);
    };
  }, []);

  return (
    <div
      className="relative h-[100dvh]  xl:h-[98dvh]  2xl:h-[90dvh] 4xl:h-[77dvh] bg-left-top bg-no-repeat pt-[4%] flex flex-col justify-between"
      style={{
        backgroundImage: `url('${IMAGE_URLS.ROG_NEO_GAMER + "c_bg04.png"}')`,
        backgroundSize: "100% 100%",
        minHeight: "-webkit-fill-available",
      }}
    >
      <div className="relative flex  h-[38px] w-full ">
        <div className="text-center text-white font-rog text-base 4xl:text-xl font-bold flex items-center justify-start gap-4 absolute top-0 left-0 pl-[5%] pt-[1%] uppercase   ">
          SERIES{" "}
        </div>
        <div className="  ml-auto ">
          <img
            src={`${IMAGE_URLS.ROG_NEO_GAMER + "c_titleborder01.png"}`}
            alt=""
          />
        </div>
      </div>
      <div className=" w-[80%] lg:w-[72%] pt-[5%]  mx-auto h-[88%]    relative bg-green-50/0">
        <AnimatePresence initial={true}>
          <motion.div className=" relative">
            <motion.img
              key={selectedSeries}
              initial={{ opacity: 0, y: 10, x: -50 }}
              animate={{ opacity: 1, y: 50, x: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              src={`${IMAGE_URLS.ROG_NEO_GAMER}${
                SERIES_DATA.find((item) => item.id === selectedSeries)?.img
              }`}
              alt=""
              className="w-full h-full object-contain"
            />
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-1 gap-4 mb-2  absolute bottom-0 w-full">
          {SERIES_DATA.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedSeries(item.id as "1" | "2" | "3")}
              className={`p-4  4xl:p-7 font-rog tracking-widest aspect-[360/40] text-lg 4xl:text-2xl bg-contain whitespace-nowrap bg-no-repeat bg-center flex items-center justify-center text-white/80 scale-95 hover:scale-105 transition-transform ${
                selectedSeries === item.id
                  ? "opacity-100 scale-100"
                  : "opacity-50 scale-95"
              }`}
              style={{
                backgroundImage: `url('${IMAGE_URLS.ROG_NEO_GAMER}p2_btn_border.png')`,
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full pt-[5%] h-[12%]  ">
        {!isDesktop && (
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
        )}
      </div>
    </div>
  );
};

export default SeriesChoosePage;
