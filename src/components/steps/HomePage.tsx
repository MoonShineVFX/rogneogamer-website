import { motion } from "framer-motion";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import { IMAGE_URLS } from "../../helpers/constants";
import { useWindowResize } from "../../hooks/useWindowResize";
interface HomePageProps {
  onNext: () => void;
}

// interface InputStatus {
//   isValid: boolean;
//   message?: string;
// }

const HomePage = ({ onNext }: HomePageProps) => {
  const { displayName, setDisplayName } = useAppContext();
  const [isUsername, setIsUsername] = useState(true);
  const [isAccept, setIsAccept] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const windowSize = useWindowResize();
  // const isMobile = useIsMobile();
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (displayName.trim()) {
  //     onNext();
  //   }
  // };
  // 只在視窗大小改變時更新 CSS 變數
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--window-height",
      `${windowSize.height}px`
    );
  }, [windowSize.height]);
  let r2imagesurl = "https://r2.web.moonshine.tw/opt/md/msweb/roggamercard";

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

  const handleClick = async () => {
    if (!displayName.trim()) {
      setIsUsername(false);
      return;
    }

    try {
      setIsSending(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onNext();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className=" relative ">
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
          src={r2imagesurl + "/images/home_rog_logo2.png"}
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
          <img src={r2imagesurl + "/images/mb/home_title_mb.png"} alt="title" />
        </motion.div>
        <div className="max-w-full h-[95dvh] aspect-[2/16] bg-yellow-300/0 fixed top-[3%] left-2  z-50">
          <img
            src={r2imagesurl + "/images/mb/home_left_fui_mb2x.png"}
            alt="title"
            className="h-full"
          />
        </div>
        <div className="max-w-full w-[22%] fixed top-4 right-2 bg-slate-400/0 z-50">
          <img
            src={r2imagesurl + "/images/mb/home_right_fui_mb.png"}
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
            src={r2imagesurl + "/images/mb/home_top_slash_mb.png"}
            alt="title"
            className="w-full"
          />
        </motion.div>
        <div className="max-w-full w-[100%] fixed bottom-0 left-0 bg-slate-400/0 z-20 mix-blend-multiply">
          <img
            src={r2imagesurl + "/images/mb/home_chmask_mb.png"}
            alt="title"
            className="w-full"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: "18%", x: 0, scale: 1.6 }}
          animate={{ opacity: 1, y: "30%", x: 0, scale: 1.7 }}
          exit={{ opacity: 0, y: "18%", x: 0, scale: 1.4 }}
          transition={{
            delay: 0.3,
            type: "spring",
            stiffness: 200,
            damping: 50,
          }}
          className="max-w-full w-[100%] fixed top-[20%] left-0 bg-slate-400/0 z-10"
        >
          <img
            src={
              "https://r2.web.moonshine.tw/opt/md/msweb/rogneogamer/prototype/character.png"
            }
            alt="avatar"
            className="w-full"
          />
        </motion.div>
        <div className="max-w-full w-[100%] fixed bottom-0 left-0 bg-slate-400/0 -z-10 animate-pulse animate-infinite animate-alternate">
          <img
            src={r2imagesurl + "/images/mb/home_redglow_mb.png"}
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
            src={r2imagesurl + "/images/mb/home_bottom_slash_mb.png"}
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
          <div className=" pl-3 mb-1 relative  text-white/80 font-cachetpro leading-normal pt-[1%] text-[6vw] w-[80%] overflow-hidden whitespace-nowrap">
            <div className="w-[6px] h-[20px] border border-red-700 bg-red-950/80 absolute top-1/2 -translate-y-1/2 left-0"></div>
            Name Your Gamer
          </div>
          <div className=" flex items-center flex-col   ">
            <div className="flex flex-col items-center gap-4  w-full  bg-slate-500/0  ">
              <div
                className={`flex w-full aspect-[410/40] justify-center items-center  bg-slate-500/0 ${
                  isUsername ? " " : " png-container"
                }`}
              >
                <div
                  className="w-[16px] bg-contain h-full  bg-no-repeat bg-right-top  bg-yellow-400/0"
                  style={{
                    backgroundImage: `url('${
                      r2imagesurl + "/images/home_input_left.png"
                    }')`,
                  }}
                ></div>
                <div
                  className="bg-contain w-full h-full bg-repeat bg-top bg-slate-400/0 flex items-center relative"
                  style={{
                    backgroundImage: `url('${
                      r2imagesurl + "/images/home_input_center.png"
                    }')`,
                  }}
                >
                  <input
                    type="text"
                    name="username"
                    className={`${
                      isSending ? "cursor-not-allowed opacity-50" : ""
                    } text-white block  w-[100%] font-robotocon  bg-transparent focus:outline-none sm:text-sm relative z-10 placeholder-gray-500`}
                    placeholder={
                      !isAccept ? " * Please agree to our terms." : ""
                    }
                    autoComplete="off"
                    maxLength={20}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    disabled={isSending}
                  />
                  {isSending && (
                    <div className=" absolute right-1 inline-block  w-[8%] aspect-square animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface"></div>
                  )}
                </div>
                <div
                  className="w-[9px] bg-contain h-full bg-no-repeat bg-left-top"
                  style={{
                    backgroundImage: `url('${
                      r2imagesurl + "/images/home_input_right.png"
                    }')`,
                  }}
                ></div>
              </div>
              <div className="text-red-700 text-[3vw] mt-[1%] font-robotocon">
                * Input is limited to 20 characters.
                <br />* Only English letters, numbers, and symbols are
                permitted.
                {!isUsername && <div>* Please name your gamer</div>}
                {!isAccept && <div>* Please agree to our terms.</div>}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 px-4">
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
            </div>
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
                    r2imagesurl + "/images/redbutton_bg.png"
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
    </div>
  );
};

export default HomePage;
