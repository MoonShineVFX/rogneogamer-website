// import { useAppContext } from "../../context/AppContext";
import { IMAGE_URLS } from "../../helpers/constants";
import { AnimatePresence, motion } from "framer-motion";
import useIsMobile from "../../hooks/useIsMobile";
import { useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
interface DownloadPageProps {
  onPrev: () => void;
  onNext: () => void;
}

const DownloadPage = ({ onPrev, onNext }: DownloadPageProps) => {
  // 移除未使用的解構
  // const { resultImages } = useAppContext();
  let scrollbarStyle = "style-1";
  const divRef = useRef(null);
  const {
    selectedSeries,
    selectedGender,
    selectedAppearance,
    selectedClothing,
    selectedAsset,
  } = useAppContext();
  const [currentMenu, setCurrentMenu] = useState("image");
  const [isAtBottom] = useState(false);
  const [qrUrl] = useState("1");
  const isMobile = useIsMobile();
  const mb_menu = [
    { title: "image" },
    { title: "wallpaper" },
    { title: "mb_wallpaper" },
    { title: "video" },
    { title: "home" },
  ];

  return (
    <div
      className="relative h-[100dvh] bg-left-top bg-no-repeat pt-[4%]  flex flex-col justify-between lg:justify-start"
      style={{
        backgroundImage: `url('${IMAGE_URLS.ROG_NEO_GAMER + "c_bg02.png"}')`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="relative flex  h-[38px] w-full z-10">
        <div className="text-center text-white font-rog text-xl font-bold flex items-center justify-start gap-4 absolute top-0 left-0 pl-[5%] pt-[1%]   ">
          DOWNLOAD{" "}
        </div>
        <div className="  ml-auto ">
          <img
            src={`${IMAGE_URLS.ROG_NEO_GAMER + "c_titleborder01.png"}`}
            alt=""
          />
        </div>
      </div>

      {/* Next/Prev 按鈕 */}
      {isMobile ? (
        <div className="w-full h-[100dvh] z-0 ">
          <motion.div
            initial={{ opacity: 0, y: "0%", scale: 1.15 }}
            animate={{ opacity: 1, y: "0%", scale: 1.15 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="h-[100dvh] transition-all w-full bg-cover bg-center bg-no-repeat z-0 fixed top-0 left-0 pointer-events-none"
            style={{
              backgroundImage: `url('${
                IMAGE_URLS.ROG_NEO_GAMER + "p5_img1.png"
              }')`,
              touchAction: "none",
            }}
          ></motion.div>
          <div
            className=" fixed top-0 left-0 w-full h-[100dvh] bg-bottom bg-cover bg-no-repeat pointer-events-none  bg-gradient-to-t from-black via-black/75 to-black/0  "
            // style={{
            //   backgroundImage: `url('${r2imagesurl+'/images/mb/final_mask2.png'}')`,
            // }}
          ></div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.5,
            }}
            className=" fixed bottom-0 left-0 w-full h-1/2  bg-bottom bg-cover bg-no-repeat opacity-90 pointer-events-none"
            style={{
              backgroundImage: `url('${
                IMAGE_URLS.ROG_GAMER_CARD + "/images/mb/final_mask_red.png"
              }')`,
            }}
          ></motion.div>

          <div className="w-full h-[100dvh] fixed bottom-0 left-0 flex flex-col overflow-hidden   ">
            <div className="h-[45dvh] w-full bg-fuchsia-500/0 mt-auto flex flex-col  ">
              <div
                className={`flex justify-between items-center w-[80%] mx-auto ${"opacity-80 brightness-100"}`}
              >
                {mb_menu.map((item, index) => {
                  return (
                    <div
                      key={"mb_menu_" + index}
                      onClick={() => setCurrentMenu(item.title)}
                      className=" bg-purple-400/0 relative"
                    >
                      <img
                        src={
                          IMAGE_URLS.ROG_NEO_GAMER_LG +
                          "final_" +
                          item.title +
                          ".svg"
                        }
                        alt=""
                      />
                      {item.title === currentMenu && (
                        <motion.div
                          initial={{ opacity: 0, x: "-50%", y: 10 }}
                          animate={{ opacity: 1, x: "-50%", y: 0 }}
                          exit={{ opacity: 0, x: "-50%", y: 10 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                          }}
                          className=" absolute w-[100%] left-1/2 bg-amber-400/0 flex items-center justify-center"
                        >
                          <img
                            src={
                              IMAGE_URLS.ROG_GAMER_CARD_GIF +
                              "/images/mb/final_selected.svg"
                            }
                            alt=""
                          />
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
              <AnimatePresence initial={true} mode="wait">
                {currentMenu === "image" && (
                  <motion.div
                    key="p_inmage"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    // exit={{ opacity: 0}}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="w-full bg-slate-700/0 pl-[10%] pr-[4%] mt-[5%] "
                  >
                    <div
                      className={`w-[4vw] fixed right-[6%] bottom-[2%]    z-[99999] pointer-events-none transition-all ${
                        isAtBottom ? "opacity-0" : " opacity-100"
                      } `}
                    >
                      <img
                        src={
                          IMAGE_URLS.ROG_GAMER_CARD_GIF +
                          "/images/mb/scroll_icon.svg"
                        }
                        alt=""
                        className=" animate-pulse"
                      />
                    </div>
                    <div
                      ref={divRef}
                      className={`${scrollbarStyle} text-white relative overflow-y-auto bg-slate-500/0 pr-[5%] max-h-[50dvh] pb-[10%]  ${"opacity-80 brightness-100"}`}
                      style={{
                        overscrollBehaviorY: "contain",
                      }}
                    >
                      <div className="w-[80%] bg-sky-600/0 flex flex-col gap-1 pt-[10%]">
                        <div className="flex  gap-2 items-center">
                          <div className=" font-cachetpro text-[5vw] font-semibold  leading-3 ">
                            SERIES:
                          </div>
                          <div className=" font-light text-[5vw] font-robotocon ">
                            {selectedSeries}
                          </div>
                        </div>
                        <div className="flex  gap-2 items-center">
                          <div className=" font-cachetpro text-[5vw] font-semibold  leading-3 ">
                            Gender:
                          </div>
                          <div className=" font-light text-[5vw] font-robotocon ">
                            {selectedGender}
                          </div>
                        </div>
                        <div className="flex  gap-2 items-center">
                          <div className=" font-cachetpro text-[5vw] font-semibold  leading-3 ">
                            Appearance:
                          </div>
                          <div className=" font-light text-[5vw] font-robotocon ">
                            {selectedAppearance}
                          </div>
                        </div>
                        <div className="flex  gap-2 items-center">
                          <div className=" font-cachetpro text-[5vw] font-semibold  leading-3 ">
                            Clothing:
                          </div>
                          <div className=" font-light text-[5vw] font-robotocon ">
                            {selectedClothing}
                          </div>
                        </div>
                        <div className="flex  gap-2 items-center">
                          <div className=" font-cachetpro text-[5vw] font-semibold  leading-3 ">
                            Asset:
                          </div>
                          <div className=" font-light text-[5vw] font-robotocon ">
                            {selectedAsset}
                          </div>
                        </div>
                      </div>

                      <div className="mt-[10%] font-light flex flex-col gap-8 pb-[25%]"></div>
                    </div>
                  </motion.div>
                )}
                {currentMenu === "wallpaper" && (
                  <motion.div
                    key="p_wallpaper"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    // exit={{ opacity: 0}}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="w-full bg-slate-700/0 px-[10%]  flex items-center h-full"
                  >
                    <div
                      className={` flex flex-col justify-center items-center gap-10 bg-orange-400/0 w-full `}
                    >
                      <a
                        href={`card3Url`}
                        target="_blank"
                        rel="noreferrer"
                        className={`${
                          qrUrl
                            ? "hover:scale-95 cursor-pointer  "
                            : " pointer-events-none grayscale text-zinc-600  cursor-wait "
                        }  transition-all duration-500 flex items-end justify-between  bg-fuchsia-100/0 pl-[10%] relative`}
                      >
                        <div className=" absolute top-0 left-0 w-[12%]  ">
                          {qrUrl ? (
                            <img
                              className=" absolute -top-1 left-0"
                              src={
                                IMAGE_URLS.ROG_GAMER_CARD +
                                "/images/final_dl_icon.png"
                              }
                              alt=""
                            />
                          ) : (
                            <div className="absolute top-0 left-0 flex items-center justify-center w-full aspect-square ">
                              <div className=" w-[4vw]  aspect-square   animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface"></div>
                            </div>
                          )}
                        </div>

                        <div
                          className={` ${"text-[#C7B299]"} font-cachetpro bg-sky-400/0 text-[5vw] underline`}
                        >
                          Download Gamer Card
                        </div>
                      </a>
                      <a
                        href={`wallpaperdUrl`}
                        target="_blank"
                        rel="noreferrer"
                        className={`${
                          qrUrl && qrUrl.length > 0
                            ? "hover:scale-95 cursor-pointer  "
                            : " pointer-events-none grayscale text-zinc-600 cursor-wait "
                        } transition-all duration-500 flex items-end justify-between bg-fuchsia-100/0 pl-[10%] relative`}
                      >
                        <div className=" absolute top-0 left-0 w-[12%]  ">
                          {qrUrl && qrUrl.length > 0 ? (
                            <img
                              className=" absolute  left-0"
                              src={
                                IMAGE_URLS.ROG_GAMER_CARD +
                                "/images/final_dl_icon.png"
                              }
                              alt=""
                            />
                          ) : (
                            <div className="absolute top-0 left-0 flex items-center justify-center w-full aspect-square ">
                              <div className=" w-[4vw]  aspect-square   animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface"></div>
                            </div>
                          )}
                        </div>

                        <div
                          className={` ${"text-[#C7B299]"} font-cachetpro bg-sky-400/0 text-[5vw] underline`}
                        >
                          Download Wallpaper
                        </div>
                      </a>
                    </div>
                  </motion.div>
                )}
                {currentMenu === "mb_wallpaper" && (
                  <motion.div
                    key="p_mb_wallpaper"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    // exit={{ opacity: 0}}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="w-full bg-slate-700/0 px-[10%]  flex items-center h-full"
                  >
                    <div
                      className={` flex flex-col justify-center items-center  bg-orange-400/0 w-full ${"opacity-80 brightness-100 "} `}
                    >
                      <div className="flex gap-[16%] mt-[7%] w-full justify-center ">
                        {/* <div className=' flex items-center w-[12%] aspect-square' onClick={handleShare}><img src={r2imagesurl+'/images/ig.svg'} alt="" className='w-full ' /></div> */}
                        <div className=" flex items-center w-[10%] aspect-square">
                          <img
                            src={
                              IMAGE_URLS.ROG_GAMER_CARD_GIF +
                              "/images/twitter.svg"
                            }
                            alt=""
                            className="w-full"
                          />
                        </div>
                        <div className=" flex items-center w-[6%] aspect-square">
                          <img
                            src={
                              IMAGE_URLS.ROG_GAMER_CARD_GIF + "/images/fb.svg"
                            }
                            alt=""
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                {currentMenu === "video" && (
                  <motion.div
                    key="p_video"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    // exit={{ opacity: 0,y:10}}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="w-full bg-slate-700/0 px-[0%]   flex items-end h-auto mt-auto "
                  >
                    <div className="   bg-orange-400/0 w-full relative   ">
                      <img
                        src={
                          IMAGE_URLS.ROG_GAMER_CARD + "/images/mb/star_fire.png"
                        }
                        alt=""
                        className="z-0 w-10/12 mx-auto brightness-[.6] "
                      />

                      <div className="w-full bg-blue-400/0 pt-[7%] h-[15dvh] fixed bottom-0 z-20  ">
                        <div className=" flex justify-center h-full bg-violet-600/0 relative">
                          <div className="h-[4vh] w-[1px] bg-white/70 absolute bottom-0 left-1/2 -translate-x-1/2 "></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                {currentMenu === "home" && (
                  <motion.div
                    key="p_home"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    // exit={{ opacity: 0}}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.3,
                    }}
                    className="w-full  px-[10%]  flex items-center h-full bg-gradient-to-t from-red-800 via-red-800/30"
                  >
                    <div
                      className={`flex flex-col justify-center items-center gap-10 bg-orange-400/0 w-full text-white`}
                    >
                      <div className=" font-cachetpro bg-sky-400/0 text-[5vw] text-center ">
                        ARE YOU SURE YOU WANT TO LEAVE? <br />
                        You will lose all your progress.
                      </div>

                      <div
                        onClick={onNext}
                        className="hover:scale-95 cursor-pointer flex items-end justify-between bg-fuchsia-100/0 pl-[12%] relative"
                      >
                        <img
                          className=" absolute top-1 left-0 w-[15%]"
                          src={
                            IMAGE_URLS.ROG_GAMER_CARD_GIF +
                            "/images/roglogo_red.svg"
                          }
                          alt=""
                        />
                        <div className=" font-cachetpro bg-sky-400/0 text-[5vw] underline">
                          Back to Home Page
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className=" absolute w-full h-screen  z-50 flex justify-center items-center text-white  ">
            <div className=" relative bg-slate-400/0 w-[80vw] h-[80vh] flex items-center justify-between gap-2  ">
              <div className=" absolute top-1/2 -translate-y-1/2 left-0 h-full w-[1px] bg-white/20"></div>
              <div className=" absolute top-1/2 -translate-y-1/2 right-0 h-full w-[1px] bg-white/20"></div>
              <motion.div
                className={` h-full  w-[70%] bg-purple-500/0 relative pl-10 flex flex-col  ${"pt-[3%] "}`}
              >
                <div className=" absolute top-1/2 -translate-y-1/2 left-0 h-full w-[1px] bg-white/20 hidden"></div>

                <motion.div
                  initial={{ opacity: 0, y: "10%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  exit={{ opacity: 0, y: "10%" }}
                  transition={{
                    type: "spring",
                    stiffness: 130,
                    damping: 20,
                    delay: 0.2,
                  }}
                  className="pr-[73%] mb-[%]  "
                >
                  <div
                    className={`w-full h-auto  mt-[10%] overflow-hidden relative flex flex-col justify-start  bg-slate-400/0    ${"opacity-80 brightness-100 "}`}
                  >
                    <div className="w-[80%] bg-sky-600/0 flex flex-col gap-1 pt-[10%]">
                      <div className="flex  gap-2 items-center">
                        <div className=" font-cachetpro text-[1.5vw] font-semibold  leading-3 ">
                          SERIES:
                        </div>
                        <div className=" font-light text-[1.5vw] font-robotocon ">
                          {selectedSeries}
                        </div>
                      </div>
                      <div className="flex  gap-2 items-center">
                        <div className=" font-cachetpro text-[1.5vw] font-semibold  leading-3">
                          Gender:
                        </div>
                        <div className=" font-light text-[1.5vw] font-robotocon ">
                          {selectedGender}
                        </div>
                      </div>
                      <div className="flex  gap-2 items-center">
                        <div className=" font-cachetpro text-[1.5vw] font-semibold  leading-3 ">
                          Appearance:
                        </div>
                        <div className=" font-light text-[1.5vw] font-robotocon ">
                          {selectedAppearance}
                        </div>
                      </div>
                      <div className="flex  gap-2 items-center">
                        <div className=" font-cachetpro text-[1.5vw] font-semibold  leading-3 ">
                          Clothing:
                        </div>
                        <div className=" font-light text-[1.5vw] font-robotocon ">
                          {selectedClothing}
                        </div>
                      </div>
                      <div className="flex  gap-2 items-center">
                        <div className=" font-cachetpro text-[1.5vw] font-semibold  leading-3 ">
                          Asset:
                        </div>
                        <div className=" font-light text-[1.5vw] font-robotocon ">
                          {selectedAsset}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 130,
                  damping: 20,
                  delay: 0.5,
                }}
                className="bg-blue-500/0 w-[30%]  flex flex-col items-end justify-between h-full pt-[5%] pr-[2%]"
              >
                <motion.div
                  className={`w-full space-y-[8%] flex flex-col  justify-end items-end ${"opacity-80 brightness-100 "}`}
                >
                  <div
                    className={` flex items-end justify-between w-[78%] pl-[12%] relative transition-all duration-500  ${
                      qrUrl
                        ? "hover:scale-95 cursor-pointer  "
                        : " grayscale brightness-50 cursor-wait "
                    }`}
                  >
                    <div className=" absolute -top-1 left-0 w-[11%]  ">
                      {qrUrl ? (
                        <img
                          className=" w-full"
                          src={
                            IMAGE_URLS.ROG_GAMER_CARD_GIF +
                            "/images/final_dl_icon.svg"
                          }
                          alt=""
                        />
                      ) : (
                        <div className="absolute top-0 left-0 flex items-center justify-center w-full aspect-square ">
                          <div className=" w-[1vw]  aspect-square   animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface"></div>
                        </div>
                      )}
                    </div>
                    <div
                      className={` font-cachetpro bg-contain  w-[100%] bg-no-repeat bg-right-bottom bg-sky-400/0 text-[1.2vw]`}
                      style={{
                        backgroundImage: `url('${
                          IMAGE_URLS.ROG_GAMER_CARD_GIF +
                          "/images/final_text_ui.png"
                        }')`,
                      }}
                    >
                      Download 16:9 Wallpaper
                    </div>
                  </div>
                  <div
                    className={`flex items-end justify-between w-[78%] pl-[12%] relative transition-all duration-500  ${
                      qrUrl && qrUrl.length > 0
                        ? "hover:scale-95 cursor-pointer  "
                        : " grayscale brightness-50 cursor-wait "
                    }`}
                  >
                    <div className=" absolute -top-1 left-0 w-[11%]">
                      {qrUrl && qrUrl.length > 0 ? (
                        <img
                          className=" w-full"
                          src={
                            IMAGE_URLS.ROG_GAMER_CARD_GIF +
                            "/images/final_dl_icon.svg"
                          }
                          alt=""
                        />
                      ) : (
                        <div className="absolute top-0 left-0 flex items-center justify-center w-full aspect-square ">
                          <div className=" w-[1vw]  aspect-square   animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface"></div>
                        </div>
                      )}
                    </div>
                    <div
                      className=" font-cachetpro bg-contain  w-[100%] bg-no-repeat bg-right-bottom bg-sky-400/0 text-[1.2vw]"
                      style={{
                        backgroundImage: `url('${
                          IMAGE_URLS.ROG_GAMER_CARD_GIF +
                          "/images/final_text_ui.png"
                        }')`,
                      }}
                    >
                      Download 9:16 Wallpaper
                    </div>
                  </div>
                  <div
                    className={`flex items-end justify-between w-[78%] pl-[12%] relative transition-all duration-500  ${
                      qrUrl && qrUrl.length > 0
                        ? "hover:scale-95 cursor-pointer  "
                        : " grayscale brightness-50 cursor-wait "
                    }`}
                  >
                    <div className=" absolute -top-1 left-0 w-[11%]">
                      {qrUrl && qrUrl.length > 0 ? (
                        <img
                          className=" w-full"
                          src={
                            IMAGE_URLS.ROG_GAMER_CARD_GIF +
                            "/images/final_dl_icon.svg"
                          }
                          alt=""
                        />
                      ) : (
                        <div className="absolute top-0 left-0 flex items-center justify-center w-full aspect-square ">
                          <div className=" w-[1vw]  aspect-square   animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface"></div>
                        </div>
                      )}
                    </div>
                    <div
                      className=" font-cachetpro bg-contain  w-[100%] bg-no-repeat bg-right-bottom bg-sky-400/0 text-[1.2vw]"
                      style={{
                        backgroundImage: `url('${
                          IMAGE_URLS.ROG_GAMER_CARD_GIF +
                          "/images/final_text_ui.png"
                        }')`,
                      }}
                    >
                      Download Video
                    </div>
                  </div>
                  <div
                    onClick={onNext}
                    className="hover:scale-95 cursor-pointer flex items-end justify-between w-[78%] bg-fuchsia-100/0 pl-[12%] relative"
                  >
                    <div className=" absolute top-1 left-0 w-[11%]">
                      <img
                        className=" w-full "
                        src={
                          IMAGE_URLS.ROG_GAMER_CARD_GIF +
                          "/images/roglogo_red.svg"
                        }
                        alt=""
                      />
                    </div>
                    <div
                      className=" font-cachetpro bg-contain  w-[100%] bg-no-repeat bg-right-bottom bg-sky-400/0 text-[1.2vw]"
                      style={{
                        backgroundImage: `url('${
                          IMAGE_URLS.ROG_GAMER_CARD_GIF +
                          "/images/final_text_ui.png"
                        }')`,
                      }}
                    >
                      Back to Homepage
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="h-screen bg-cover bg-center bg-no-repeat -z-0"
            style={{
              backgroundImage: `url('${
                IMAGE_URLS.ROG_NEO_GAMER + "p5_img1.png"
              }')`,
            }}
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className=" absolute    top-1/2 -translate-y-1/2 left-0 z-50 h-8 flex items-center hidden"
          >
            <div className="h-[1px] w-[120px] bg-white/70 mr-2"></div>
            <button
              onClick={onPrev}
              className="px-2 h-full bg-contain bg-left-top bg-no-repeat flex items-center justify-center w-[70px] hover:scale-95 font-cachet font-bold"
              style={{
                backgroundImage: `url('${
                  IMAGE_URLS.ROG_GAMER_CARD + "/images/redbutton_bg.png"
                }')`,
              }}
            >
              Back
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default DownloadPage;
