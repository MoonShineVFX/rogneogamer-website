import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import { IMAGE_URLS, HOME_DATA } from "../../helpers/constants";
import { useWindowResize } from "../../hooks/useWindowResize";
import useIsMobile from "../../hooks/useIsMobile";

interface HomePageProps {
  onNext: () => void;
}

// interface InputStatus {
//   isValid: boolean;
//   message?: string;
// }

const HomePage = ({ onNext }: HomePageProps) => {
  const { displayName, setDisplayName } = useAppContext();
  const [isUsername, setIsUsername] = useState(false);
  // const [isAccept, setIsAccept] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const windowSize = useWindowResize();
  const isMobile = useIsMobile();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  // 每秒切換圖片
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HOME_DATA.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 只在視窗大小改變時更新 CSS 變數

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--window-height",
      `${windowSize.height}px`
    );
  }, [windowSize.height]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};:'",.<>/?\\| ]*$/.test(value)) {
      setDisplayName(value);
      setIsUsername(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  const validateName = (name: string) => {
    if (!name.trim()) {
      return "請輸入名字";
    }
    return null;
  };

  const handleClick = async () => {
    // 清除之前的錯誤
    setError(null);
    const nameError = validateName(displayName);
    if (nameError) {
      setIsUsername(false);
      // setIsAccept(true);
      setError(nameError);
      console.log(error);
      return;
    }

    try {
      // 1. 先讓輸入框失焦
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      // 2. 強制重置視窗高度
      window.scrollTo(0, 0);
      document.documentElement.style.height = "100%";

      // 3. 等待一小段時間確保視窗已重置
      await new Promise((resolve) => setTimeout(resolve, 100));

      setIsSending(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 4. 確保視窗狀態正確後再切換頁面
      onNext();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSending(false);
    }
  };
  const handleBlur = () => {
    // 輸入框失焦時重置視窗
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.style.height = "100%";
    }, 100);
  };

  return (
    <div className="relative">
      {isMobile ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            className=" bg-left-top bg-no-repeat z-0 w-full fixed   min-h-[100vh] min-h-[100dvh] "
            style={{
              backgroundImage: `url('${
                IMAGE_URLS.ROG_GAMER_CARD + "/images/mb/home_bg_mb.png"
              }')`,
              backgroundSize: "100% 100%",
              minHeight: "var(--window-height, 100vh)",
            }}
          ></motion.div>
          <motion.img
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0,
            }}
            src={IMAGE_URLS.ROG_GAMER_CARD + "/images/home_rog_logo2.png"}
            alt="logo"
            className="max-w-full w-[15%] fixed top-8 right-8 z-50"
          />
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.5,
            }}
            className="max-w-full w-[47%] fixed top-[5%] left-8 z-50"
          >
            <img
              src={IMAGE_URLS.ROG_NEO_GAMER + "home_title_mb.png"}
              alt="title"
            />
          </motion.div>
          <div className="max-w-full h-[95dvh] aspect-[2/16] bg-yellow-300/0 fixed top-[3%] left-2  z-50">
            <img
              src={
                IMAGE_URLS.ROG_GAMER_CARD + "/images/mb/home_left_fui_mb2x.png"
              }
              alt="title"
              className="h-full"
            />
          </div>
          <div className="max-w-full w-[22%] fixed top-4 right-2 bg-slate-400/0 z-50">
            <img
              src={
                IMAGE_URLS.ROG_GAMER_CARD + "/images/mb/home_right_fui_mb.png"
              }
              alt="title"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.5,
            }}
            className="max-w-full w-[100%] fixed top-[15%] left-0 bg-slate-400/0 z-0"
          >
            <img
              src={
                IMAGE_URLS.ROG_GAMER_CARD + "/images/mb/home_top_slash_mb.png"
              }
              alt="title"
              className="w-full"
            />
          </motion.div>
          <div className="max-w-full w-[100%] fixed bottom-0 left-0 bg-slate-400/0 z-20 mix-blend-multiply">
            <img
              src={IMAGE_URLS.ROG_GAMER_CARD + "/images/mb/home_chmask_mb.png"}
              alt="title"
              className="w-full"
            />
          </div>
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[50vh] z-10">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={
                  IMAGE_URLS.ROG_NEO_GAMER_LG +
                  "characters/" +
                  HOME_DATA[currentImageIndex].img
                }
                alt={`character-${currentImageIndex}`}
                initial={{ opacity: 0, y: "18%", x: 0, scale: 1.6 }}
                animate={{ opacity: 1, y: "45%", x: "-2%", scale: 1.7 }}
                exit={{ opacity: 0, y: "45%", x: "-2%", scale: 1.4 }}
                transition={{
                  delay: 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 50,
                }}
                className="w-full"
              />
            </AnimatePresence>
          </div>
          <div className="max-w-full w-[100%] fixed bottom-0 left-0 bg-slate-400/0 -z-10 animate-pulse animate-infinite animate-alternate">
            <img
              src={IMAGE_URLS.ROG_GAMER_CARD + "/images/mb/home_redglow_mb.png"}
              alt="title"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.9,
            }}
            className="max-w-full w-[100%] fixed -bottom-[10%] left-0 bg-slate-400/0 z-20"
          >
            <img
              src={
                IMAGE_URLS.ROG_GAMER_CARD +
                "/images/mb/home_bottom_slash_mb.png"
              }
              alt="title"
              className="w-full"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: "-50%", y: "50%" }}
            animate={{ opacity: 1, x: "-50%", y: "0%" }}
            exit={{ opacity: 0, x: "-50%", y: "50%" }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 1,
            }}
            className=" fixed bottom-0 left-1/2 border-[#B1B1B1]  bg-slate-600/0 w-[75%] max-w-[500px] z-50  "
          >
            <div className=" pl-3 mb-1 relative  text-white/80 font-cachetpro leading-normal pt-[1%] text-[6vw] w-[80%] overflow-hidden whitespace-nowrap ">
              <div className="w-[6px] h-[20px] border border-red-700 bg-red-950/80 absolute top-1/2 -translate-y-1/2 left-0"></div>
              Name Your Gamer
            </div>
            <div className=" flex items-center flex-col   ">
              <div className="flex flex-col items-center gap-4  w-full  bg-slate-500/0  ">
                <div
                  className={`flex w-full aspect-[410/40] justify-center items-center  bg-slate-500/0  ${
                    isUsername ? " " : " png-container"
                  }`}
                >
                  <div
                    className="w-[16px] bg-contain h-full  bg-no-repeat bg-right-top  bg-yellow-400/0"
                    style={{
                      backgroundImage: `url('${
                        IMAGE_URLS.ROG_GAMER_CARD +
                        "/images/home_input_left.png"
                      }')`,
                    }}
                  ></div>
                  <div
                    className="bg-contain w-full h-full bg-repeat bg-top bg-slate-400/0 flex items-center relative"
                    style={{
                      backgroundImage: `url('${
                        IMAGE_URLS.ROG_GAMER_CARD +
                        "/images/home_input_center.png"
                      }')`,
                    }}
                  >
                    <input
                      type="text"
                      name="username"
                      className={` ${
                        isSending ? "cursor-not-allowed opacity-50" : ""
                      } text-white block  w-[100%] font-robotocon  bg-transparent focus:outline-none sm:text-sm relative z-10 placeholder-gray-500 `}
                      autoComplete="off"
                      maxLength={20}
                      onChange={onChange}
                      onKeyDown={handleKeyDown}
                      disabled={isSending}
                      onBlur={handleBlur}
                      placeholder={displayName ? "" + displayName : ""}
                    />
                    {isSending && (
                      <div className=" absolute right-1 inline-block  w-[8%] aspect-square animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface"></div>
                    )}
                  </div>
                  <div
                    className="w-[9px] bg-contain h-full bg-no-repeat bg-left-top"
                    style={{
                      backgroundImage: `url('${
                        IMAGE_URLS.ROG_GAMER_CARD +
                        "/images/home_input_right.png"
                      }')`,
                    }}
                  ></div>
                </div>
                <div className="text-red-700 text-[3vw] mt-[1%] font-robotocon ">
                  * Input is limited to 20 characters.
                  <br />* Only English letters, numbers, and symbols are
                  permitted.
                  {!isUsername && <div>* Please name your gamer</div>}
                </div>
              </div>
              {/* <div className="flex items-center gap-2 mt-4 px-4 h-[10%]">
                <input
                  type="checkbox"
                  id="terms"
                  checked={isAccept}
                  onChange={(e) => setIsAccept(e.target.checked)}
                  className="w-4 h-4 accent-red-700"
                />
                <label htmlFor="terms" className="text-[3vw] text-white/80">
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div> */}
              <div className="flex flex-col items-center gap-9  w-full  bg-slate-500/0  ">
                <button
                  onClick={handleClick}
                  aria-label="start"
                  disabled={isSending}
                  className={`${
                    isSending ? "grayscale" : "grayscale-0"
                  } z-0 w-[24%] mt-[10%] aspect-[90/40] text-white/80  bg-contain bg-top bg-no-repeat flex items-center justify-center   hover:scale-95 font-cachet font-bold`}
                  style={{
                    backgroundImage: `url('${
                      IMAGE_URLS.ROG_GAMER_CARD + "/images/redbutton_bg.png"
                    }')`,
                  }}
                >
                  START
                </button>
              </div>
              <div className="h-[3vh] w-[1px] bg-white/70  mt-[5%]"></div>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          {/* 背景光暈 */}
          <div className="w-full h-full absolute top-0 right-0 z-0 mix-blend-screen">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={
                IMAGE_URLS.ROG_GAMER_CARD + "/images/home_right_side_glow.png"
              }
              alt=""
              className="max-w-full h-full absolute right-0 animate-pulse animate-infinite animate-alternate"
            />
          </div>

          {/* 主背景 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="h-screen bg-cover bg-center bg-no-repeat z-0 w-full"
            style={{
              backgroundImage: `url('${IMAGE_URLS.ROG_GAMER_CARD}/images/home_bg3.png')`,
              minHeight: "var(--window-height, 100vh)",
            }}
          />

          {/* ROG Logo */}
          <motion.img
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            src={IMAGE_URLS.ROG_GAMER_CARD + "/images/home_rog_logo2.png"}
            alt="logo"
            className="max-w-full w-[4.2vw] absolute top-8 right-8 z-50"
          />

          {/* 主要內容容器 */}
          <motion.div className="absolute top-0 w-full h-screen overflow-hidden">
            {/* 左側裝飾 */}
            <motion.div
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: "-23%" }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 130,
                damping: 20,
                delay: 0.5,
              }}
              className="absolute max-w-full h-full z-20 pointer-events-none"
            >
              <img
                src={
                  IMAGE_URLS.ROG_GAMER_CARD +
                  "/images/home_frontshapeleft_red.png"
                }
                alt=""
                className="h-full aspect-square"
              />
            </motion.div>

            {/* 右側裝飾 */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: "-15%" }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 130,
                damping: 20,
                delay: 0.5,
              }}
              className="absolute top-0 max-w-full h-full right-0 z-0"
            >
              <img
                src={
                  IMAGE_URLS.ROG_GAMER_CARD +
                  "/images/home_frontshaperight_red.png"
                }
                alt=""
                className="h-full aspect-square"
              />
            </motion.div>

            {/* 中央角色 */}
            <AnimatePresence initial={true}>
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, y: "15%", x: 0, scale: 1.4 }}
                animate={{ opacity: 1, y: "15%", x: "-60%", scale: 1.5 }}
                exit={{ opacity: 0, y: "15%", x: "-160%", scale: 1.4 }}
                transition={{
                  delay: 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 50,
                }}
                className="absolute top-[16%] 2xl:top-[12%] left-1/2 -translate-x-1/2 w-[70vh] 2xl:w-[70vh] z-10"
              >
                <img
                  src={
                    IMAGE_URLS.ROG_NEO_GAMER_LG +
                    "characters/" +
                    HOME_DATA[currentImageIndex].img
                  }
                  alt={`character-${currentImageIndex}`}
                  className="w-full"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: "-50%", x: "-10%" }}
              animate={{ opacity: 1, y: "-50%", x: "7%" }}
              exit={{ opacity: 0, y: "-50%", x: "-25%" }}
              transition={{
                type: "spring",
                stiffness: 130,
                damping: 20,
                delay: 1.5,
              }}
              className=" absolute top-1/2 left-0 z-50 w-[57vw]   mix-blend-screen pointer-events-none"
            >
              <img
                src={IMAGE_URLS.ROG_NEO_GAMER + "home_title.png"}
                alt=""
                className="w-[100%] "
              />
            </motion.div>
          </AnimatePresence>

          <motion.img
            initial={{ opacity: 0, x: "-50%", y: -20 }}
            animate={{ opacity: 1, x: "-50%", y: 0 }}
            exit={{ opacity: 0, x: "-50%", y: -20 }}
            transition={{
              type: "spring",
              stiffness: 130,
              damping: 20,
              delay: 1,
            }}
            className=" absolute bottom-10 max-w-full w-4/5   z-40 left-1/2"
            src={
              IMAGE_URLS.ROG_GAMER_CARD_GIF +
              "/images/home_for_those_who_dare.png"
            }
            alt=""
          />

          {/* 輸入區域 */}
          <motion.div
            initial={{ opacity: 0, x: 100, y: "-50%" }}
            animate={{ opacity: 1, x: 0, y: "-50%" }}
            exit={{ opacity: 0, x: 100, y: "-50%" }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 1,
            }}
            className="absolute top-1/2 right-0 border-[#B1B1B1] pl-2 bg-slate-600/0 lg:w-[25vw] 2xl:w-[30vw] max-w-[900px] z-30"
          >
            <div className="pl-[3%] mb-1 relative font-cachetpro leading-normal pt-[1%] text-lg w-[80%] overflow-hidden whitespace-nowrap ">
              <div className="w-[2%] h-[60%] border border-red-700 bg-red-950/80 absolute top-1/2 -translate-y-1/2 left-0"></div>
              <span className="text-[1.2vw] font-robotocon text-white/80">
                Name Your Gamer
              </span>
            </div>

            {/* 輸入框區域 */}
            <div className="flex items-center ">
              <div className="flex items-center gap-1 w-full bg-slate-500/0 ">
                <div
                  className={`flex w-full aspect-[350/40] justify-center items-center bg-slate-500/0  ${
                    isUsername ? "" : "png-container"
                  }`}
                >
                  <img
                    src={
                      IMAGE_URLS.ROG_GAMER_CARD + "/images/home_input_left.png"
                    }
                    alt=""
                    className="h-full"
                  />
                  <div
                    className="bg-contain w-full h-full bg-repeat bg-top bg-slate-400/0 flex items-center relative"
                    style={{
                      backgroundImage: `url('${IMAGE_URLS.ROG_GAMER_CARD}/images/home_input_center.png')`,
                    }}
                  >
                    <input
                      type="text"
                      name="username"
                      className="block w-[100%] text-[1vw] font-robotocon text-white bg-transparent focus:outline-none relative z-10 placeholder-gray-500"
                      autoComplete="off"
                      maxLength={20}
                      onChange={onChange}
                      onKeyDown={handleKeyDown}
                      placeholder={displayName ? "before:" + displayName : ""}

                      // disabled={!isAccept}
                    />
                    {isSending && (
                      <div className="absolute right-1 inline-block w-[8%] aspect-square animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface"></div>
                    )}
                  </div>
                  <div
                    className="w-[8%] bg-contain h-full bg-no-repeat bg-left-top"
                    style={{
                      backgroundImage: `url('${IMAGE_URLS.ROG_GAMER_CARD}/images/home_input_right.png')`,
                    }}
                  ></div>
                </div>

                {/* Start 按鈕 */}
                <button
                  onClick={handleClick}
                  aria-label="start"
                  disabled={isSending}
                  className={`z-0 w-[24%] text-[1vw] aspect-[90/40]  ${
                    isSending || !isUsername ? "grayscale" : "grayscale-0"
                  } bg-contain bg-top bg-no-repeat flex items-center justify-center hover:scale-95 font-robotocon font-bold text-white/80`}
                  style={{
                    backgroundImage: `url('${IMAGE_URLS.ROG_GAMER_CARD}/images/redbutton_bg.png')`,
                  }}
                >
                  START
                </button>
              </div>
              <div className="h-[1px] w-[6vw] bg-white/70 ml-1 "></div>
            </div>

            {/* 錯誤訊息 */}
            <div className="text-red-700 text-[1vw] mt-[2%] font-robotocon ">
              * Input is limited to 20 characters.
              <br />* Only English letters, numbers, and symbols are permitted.
              {!isUsername && <div>* Please name your gamer</div>}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default HomePage;
