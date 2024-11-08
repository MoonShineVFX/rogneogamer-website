import { useAppContext } from "../../context/AppContext";
import { IMAGE_URLS } from "../../helpers/constants";
import { motion } from "framer-motion";

interface StyleChoosePageProps {
  onNext: () => void;
  onPrev: () => void;
}

const StyleChoosePage = ({ onNext, onPrev }: StyleChoosePageProps) => {
  const {
    selectedGender,
    setSelectedGender,
    selectedAppearance,
    setSelectedAppearance,
    selectedClothing,
    setSelectedClothing,
  } = useAppContext();

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
        backgroundImage: `url('${IMAGE_URLS.ROG_NEO_GAMER + "p3_bg_2.png"}')`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className=" pt-[25%]  relative ">
        <div className="w-[78%] aspect-[367/733] mx-auto">
          <img src={IMAGE_URLS.ROG_NEO_GAMER + "character.png"} alt="" />
        </div>
        <div className=" absolute top-0 left-0 w-full h-full right-0 bottom-0 flex flex-col justify-between pt-[30%] pb-[10%] items-center bg-orange-500/0">
          <div className="w-[80%]">
            <div className="flex justify-between items-center gap-4 ">
              <button
                onClick={() =>
                  setSelectedAppearance((prev: number) => Math.max(0, prev - 1))
                }
                className="w-[16%] aspect-square hover:scale-95 transition-transform animate-pulse"
              >
                <img
                  src={
                    IMAGE_URLS.ROG_GAMER_CARD +
                    "/images/character_left_btn2x.png"
                  }
                  alt="previous"
                  className="w-full h-full object-contain"
                />
              </button>
              <div className="text-white/10">外觀 {selectedAppearance + 1}</div>
              <button
                onClick={() =>
                  setSelectedAppearance((prev: number) => prev + 1)
                }
                className="w-[16%] aspect-square hover:scale-95 transition-transform animate-pulse"
              >
                <img
                  src={
                    IMAGE_URLS.ROG_GAMER_CARD +
                    "/images/character_right_btn2x.png"
                  }
                  alt="next"
                  className="w-full h-full object-contain"
                />
              </button>
            </div>
          </div>

          <div className="w-[80%]">
            <div className="flex justify-between items-center gap-4">
              <button
                onClick={() =>
                  setSelectedClothing((prev: number) => Math.max(0, prev - 1))
                }
                className="w-[16%] aspect-square hover:scale-95 transition-transform animate-pulse"
              >
                <img
                  src={
                    IMAGE_URLS.ROG_GAMER_CARD +
                    "/images/character_left_btn2x.png"
                  }
                  alt="previous"
                  className="w-full h-full object-contain"
                />
              </button>
              <div className="text-white/10">衣服 {selectedClothing + 1}</div>
              <button
                onClick={() => setSelectedClothing((prev: number) => prev + 1)}
                className="w-[16%] aspect-square hover:scale-95 transition-transform animate-pulse"
              >
                <img
                  src={
                    IMAGE_URLS.ROG_GAMER_CARD +
                    "/images/character_right_btn2x.png"
                  }
                  alt="next"
                  className="w-full h-full object-contain"
                />
              </button>
            </div>
          </div>

          <div className="flex gap-4 w-[80%] justify-center">
            <button
              onClick={() => setSelectedGender("male")}
              className={`flex-1  aspect-[16/8] -mr-4 font-rog text-xl tracking-widest  bg-contain bg-no-repeat bg-center flex items-center justify-center text-white/80 hover:scale-105 transition-transform ${
                selectedGender === "male"
                  ? "opacity-100 scale-105"
                  : "opacity-70 scale-95"
              }`}
              style={{
                backgroundImage: `url('${IMAGE_URLS.ROG_NEO_GAMER}p3_male.png')`,
              }}
            >
              MAlE
            </button>
            <button
              onClick={() => setSelectedGender("female")}
              className={`flex-1  bg-contain -ml-4 font-rog text-xl tracking-widest bg-no-repeat bg-center flex items-center justify-center text-white/80 hover:scale-105 transition-transform ${
                selectedGender === "female"
                  ? "opacity-100 scale-105"
                  : "opacity-70 scale-95"
              }`}
              style={{
                backgroundImage: `url('${IMAGE_URLS.ROG_NEO_GAMER}p3_female.png')`,
              }}
            >
              FEMALE
            </button>
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

export default StyleChoosePage;
