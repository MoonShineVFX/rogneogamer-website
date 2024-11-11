import { motion } from "framer-motion";
import { IMAGE_URLS } from "../../helpers/constants";
import { useAppContext } from "../../context/AppContext";
interface SeriesChoosePageProps {
  onNext: () => void;
  onPrev: () => void;
}

const SeriesChoosePage = ({ onNext, onPrev }: SeriesChoosePageProps) => {
  const { selectedSeries, setSelectedSeries } = useAppContext();

  const series = [
    { id: 0, name: "SERIES NAME 1" },
    { id: 1, name: "SERIES NAME 2" },
    { id: 2, name: "SERIES NAME 3" },
  ];

  const handleNext = () => {
    onNext();
  };

  const handlePrev = () => {
    onPrev();
  };

  return (
    <div
      className=" relative h-[100dvh] bg-left-top bg-no-repeat flex flex-col justify-between"
      style={{
        backgroundImage: `url('${IMAGE_URLS.ROG_NEO_GAMER + "p2_bg.png"}')`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className=" w-[88%] pt-[5%]  mx-auto h-full  relative bg-green-50/0">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className=" relative"
        >
          <motion.img
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            src={IMAGE_URLS.ROG_NEO_GAMER + "p2_character.png"}
            alt=""
            className="w-full h-full object-contain"
          />
        </motion.div>
        <div className="grid grid-cols-1 gap-4 mb-3  absolute bottom-0 w-full">
          {series.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedSeries(item.id)}
              className={`p-4 font-rog tracking-widest aspect-[410/40] text-lg bg-contain bg-no-repeat bg-center flex items-center justify-center text-white/80 scale-95 hover:scale-105 transition-transform ${
                selectedSeries === item.id
                  ? "opacity-100 scale-105"
                  : "opacity-70 scale-95"
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

export default SeriesChoosePage;
