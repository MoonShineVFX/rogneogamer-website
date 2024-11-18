import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { IMAGE_URLS } from "../../helpers/constants";
import { motion } from "framer-motion";

interface StyleChoosePageProps {
  onNext: () => void;
  onPrev: () => void;
  isDesktop: boolean;
}

const StyleChoosePage = ({
  onNext,
  onPrev,
  isDesktop,
}: StyleChoosePageProps) => {
  const {
    selectedGender,
    setSelectedGender,
    selectedAppearance,
    setSelectedAppearance,
    selectedClothing,
    setSelectedClothing,
  } = useAppContext();

  const [currentSet, setCurrentSet] = useState("appearance");

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
        backgroundImage: `url('${IMAGE_URLS.ROG_NEO_GAMER + "p3_bg_2.png"}')`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="relative flex  h-[38px] w-full ">
        <div className="text-center text-white font-rog text- xl font-bold flex items-center justify-start gap-4 absolute top-0 left-0 pl-[5%] pt-[1%] uppercase   ">
          Character{" "}
        </div>
        <div className="  ml-auto ">
          <img
            src={`${IMAGE_URLS.ROG_NEO_GAMER + "c_titleborder01.png"}`}
            alt=""
          />
        </div>
      </div>
      <div className="pt-[5%] h-[83%]  mx-auto  flex flex-col justify-center  gap-4 bg-emerald-600/0">
        <div className="w-full h-full  mx-auto ">
          <motion.img
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            src={IMAGE_URLS.ROG_NEO_GAMER + "character.png"}
            alt=""
            className="max-w-full max-h-full mx-auto"
          />
          <div className=" absolute top-0 left-0 w-full h-full right-0 bottom-0  flex flex-col justify-evenly pt-[0%] pb-[10%] items-center bg-orange-500/0">
            <div className="w-[80%]">
              <div className="flex justify-between items-center gap-4 ">
                <button
                  onClick={() => {
                    setSelectedAppearance((prev: number) =>
                      Math.max(0, prev - 1)
                    );
                    setCurrentSet("appearance");
                  }}
                  className={`w-[16%] aspect-square hover:scale-95 transition-transform  ${
                    currentSet === "appearance" ? "animate-pulse" : " grayscale"
                  }`}
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
                <div className="text-white/10">
                  外觀 {selectedAppearance + 1}
                </div>
                <button
                  onClick={() => {
                    setSelectedAppearance((prev: number) => prev + 1);
                    setCurrentSet("appearance");
                  }}
                  className={`w-[16%] aspect-square hover:scale-95 transition-transform  ${
                    currentSet === "appearance" ? "animate-pulse" : " grayscale"
                  }`}
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
                  onClick={() => {
                    setSelectedClothing((prev: number) =>
                      Math.max(0, prev - 1)
                    );
                    setCurrentSet("clothing");
                  }}
                  className={`w-[16%] aspect-square hover:scale-95 transition-transform  ${
                    currentSet === "clothing" ? "animate-pulse" : " grayscale"
                  }`}
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
                  onClick={() => {
                    setSelectedClothing((prev: number) => prev + 1);
                    setCurrentSet("clothing");
                  }}
                  className={`w-[16%] aspect-square hover:scale-95 transition-transform  ${
                    currentSet === "clothing" ? "animate-pulse" : " grayscale"
                  }`}
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
      </div>

      <div className="w-full pt-[5%] h-[12%]  bottom-0">
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

export default StyleChoosePage;
