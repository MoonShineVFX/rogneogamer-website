import { memo, useCallback } from "react";
import { ASSET_DATA, IMAGE_URLS, SERIES_DATA } from "../../helpers/constants";
import { AnimatePresence, motion } from "framer-motion";
import useIsMobile from "../../hooks/useIsMobile";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import ScreenProgress from "../common/ScreenProgress";
import { faceSwapApi } from "../../services/api";
import ReactPlayer from "react-player";
interface DownloadPageProps {
  onPrev: () => void;
  onNext: () => void;
}

const DownloadPage = memo(({ onNext, onPrev }: DownloadPageProps) => {
  let scrollbarStyle = "style-1";
  const divRef = useRef(null);
  const {
    selectedSeries,
    selectedGender,
    selectedAppearance,
    selectedClothing,
    selectedAsset,
    capturedImage,
  } = useAppContext();
  const [currentMenu, setCurrentMenu] = useState("image");
  const [isAtBottom] = useState(false);
  const isMobile = useIsMobile();
  const [showProgress, setShowProgress] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [renderedResultImage, setRenderedResultImage] = useState<string | null>(
    null
  );
  const [renderedResultImageMb, setRenderedResultImageMb] = useState<
    string | null
  >(null);
  const [renderedResultVideo, setRenderedResultVideo] = useState<string | null>(
    null
  );
  const [showVideo, setShowVideo] = useState(false);
  console.log(error);
  const mb_menu = [
    { title: "image" },
    { title: "wallpaper" },
    { title: "mb_wallpaper" },
    { title: "video" },
    { title: "home" },
  ];
  console.log("元件 執行一次");

  const processApiCalls = useCallback(async () => {
    console.log("processApiCalls 執行一次");
    if (!capturedImage) return;

    try {
      setError(null);

      const [imageResponse, videoResponse, mobileResponse] = await Promise.all([
        // PC 版圖片
        faceSwapApi.swapFace(
          capturedImage,
          `${IMAGE_URLS.ROG_NEO_GAMER}composed/h_templates/${
            "S" +
            selectedSeries +
            selectedGender +
            selectedAppearance +
            "C0" +
            selectedClothing +
            "A" +
            selectedAsset
          }.jpg`
        ),

        // 影片
        faceSwapApi.swapFaceVideo(
          capturedImage,
          `${IMAGE_URLS.ROG_NEO_GAMER}videoV4/${
            "S" + selectedSeries + "_" + selectedGender
          }.mp4`
        ),

        // 手機版圖片
        faceSwapApi.swapFace_mb(
          capturedImage,
          `${IMAGE_URLS.ROG_NEO_GAMER}composed/v_templates3/${
            "S" +
            selectedSeries +
            selectedGender +
            selectedAppearance +
            "C0" +
            selectedClothing +
            "A" +
            selectedAsset
          }.jpg`
        ),
      ]);

      return { imageResponse, videoResponse, mobileResponse };
    } catch (error) {
      setError("處理過程發生錯誤");
    }
  }, [
    capturedImage,
    selectedSeries,
    selectedGender,
    selectedAppearance,
    selectedClothing,
    selectedAsset,
  ]);

  const handleImageResult = useCallback(async (id: string) => {
    const response = await faceSwapApi.getSwappedImage(id);

    if (response.restarted >= 2) {
      setError("Timeout error, please upload the image again.");
      return;
    }

    if (response.finished === 0) {
      setTimeout(() => handleImageResult(id), 1000);
      return;
    }

    if (response.finished === 1) {
      setRenderedResultImage(response.generations[0].img);
    }
  }, []);

  const handleVideoResult = useCallback(async (id: string) => {
    if (!id) return;
    const response = await faceSwapApi.getSwappedVideo(id);

    setTimeout(async () => {
      if (response.status === "failed") {
        setError("影片下載失敗");
        return;
      }
      if (response.progress < 100 || response.status === "processing") {
        setTimeout(() => handleVideoResult(id), 1000);
        return;
      }
      if (response.status === "completed" && response.source_path.length > 0) {
        setRenderedResultVideo(response.output_path);
      }
      console.log(response);
    }, 1000);
  }, []);
  const handleImageResult_mb = useCallback(async (id: string) => {
    if (!id) return;
    const response = await faceSwapApi.getSwappedImage_mb(id);
    setTimeout(async () => {
      // if response.
      if (response.restarted >= 2) {
        setError("Timeout error, please upload the image again.");
        return;
      }
      if (response.finished === 0) {
        setTimeout(() => handleImageResult_mb(id), 1000);
        return;
      }
      if (response.finished === 1) {
        setRenderedResultImageMb(response.generations[0].img);
      }
    }, 1000);
  }, []);

  const handleVideoClick = useCallback(() => {
    if (renderedResultVideo) {
      setShowVideo(true);
    }
  }, [renderedResultVideo]);

  useEffect(() => {
    let isSubscribed = true;

    const processImage = async () => {
      const results = await processApiCalls();

      if (!isSubscribed || !results) return;

      const { imageResponse, videoResponse, mobileResponse } = results;

      if (imageResponse?.id) {
        setTimeout(() => handleImageResult(imageResponse.id), 500);
      }

      if (videoResponse?.job_id) {
        setTimeout(() => handleVideoResult(videoResponse.job_id), 500);
      }

      if (mobileResponse?.id) {
        setTimeout(() => handleImageResult_mb(mobileResponse.id), 500);
      }
    };

    processImage();

    return () => {
      isSubscribed = false;
    };
  }, [processApiCalls]);

  // POST https://rogneogamer-api.moonshine-studio.net/face_swap
  // GET https://rogneogamer-api.moonshine-studio.net/images/:id
  // POST https://rogneogamer-api.moonshine-studio.net/video_face_swap
  // GET https://rogneogamer-api.moonshine-studio.net/video/:id

  const downloadVideo = (url: string) => {
    let corsanywhere = "https://mscors-anywhwere.kilokingw.workers.dev/?";
    const fileName = "outputVideo.mp4";

    fetch(corsanywhere + url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const videoBlob = new Blob([blob], { type: "video/mp4" });
        const downloadUrl = window.URL.createObjectURL(videoBlob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", fileName);

        // Append to the document
        document.body.appendChild(link);

        // Trigger download
        link.click();

        // Clean up
        link.parentNode!.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      })
      .catch((err) => console.error("Error downloading video:", err));
  };
  // 首先添加一個 VideoModal 組件
  const VideoModal = ({
    videoUrl,
    onClose,
  }: {
    videoUrl: string;
    onClose: () => void;
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.5 }}
          className="relative w-auto h-[80vh] max-h-[900px] aspect-[9/16] bg-black rounded-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <ReactPlayer
            url={videoUrl}
            className="w-full h-full"
            playing
            playsinline
            muted
            loop
            width="100%"
            height="100%"
            style={{ aspectRatio: "9/16" }} // 設置直式影片比例
            config={{
              file: {
                attributes: {
                  style: {
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  },
                },
              },
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="relative h-[100dvh] bg-left-top bg-no-repeat   flex flex-col justify-between lg:justify-start">
      {/* 添加 Video Modal */}
      <AnimatePresence>
        {showVideo && renderedResultVideo && (
          <VideoModal
            videoUrl={renderedResultVideo}
            onClose={() => setShowVideo(false)}
          />
        )}
      </AnimatePresence>
      {/* 添加 ScreenProgress */}
      {showProgress && (
        <ScreenProgress
          duration={12000}
          onComplete={() => setShowProgress(false)}
        />
      )}
      <div className="fixed flex  h-[58px] w-full z-10 top-[0%] bg-gradient-to-b from-red-900 via-red-900/50 to-red-900/0">
        {/* <div className="  ml-auto pt-[2%] ">
          <img
            src={`${IMAGE_URLS.ROG_NEO_GAMER + "c_titleborder01.png"}`}
            alt=""
          />
        </div> */}
      </div>

      {isMobile ? (
        <div className="w-full h-[100dvh] z-0 ">
          <motion.div
            initial={{ opacity: 0, y: "0%", scale: 0.8 }}
            animate={{ opacity: 1, y: "0%", scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="h-[100dvh] transition-all w-[100%] bg-contain bg-top bg-no-repeat z-0 fixed top-0 left-0 pointer-events-none"
            style={{
              backgroundImage: `url('${
                renderedResultImageMb ? renderedResultImageMb : ""
              }')`,
              touchAction: "none",
            }}
          ></motion.div>
          <div
            className=" fixed top-0 left-0 w-full h-[100dvh] bg-bottom bg-cover bg-no-repeat pointer-events-none  bg-gradient-to-t from-black via-black/25 to-black/0  "
            // style={{
            //   backgroundImage: `url('${
            //     IMAGE_URLS.ROG_GAMER_CARD + "/images/mb/final_mask2.png"
            //   }')`,
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
                          IMAGE_URLS.ROG_NEO_GAMER +
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
                      <div className="w-[90%] bg-sky-600/0 flex flex-col gap-1 pt-[10%]">
                        <div className="flex  gap-2 items-center">
                          <div className=" font-cachetpro text-[5vw] font-semibold  leading-3 ">
                            SERIES:
                          </div>
                          <div className=" font-light text-[5vw] font-robotocon -mt-[6px] ">
                            {
                              SERIES_DATA.find(
                                (item) => item.id === selectedSeries
                              )?.name
                            }
                          </div>
                        </div>
                        <div className=" font-light text-[5vw] font-robotocon ">
                          {
                            SERIES_DATA.find(
                              (item) => item.id === selectedSeries
                            )?.description
                          }
                        </div>
                        <div className="flex  gap-2 items-center mt-[10%]">
                          <div className=" font-cachetpro text-[5vw] font-semibold  leading-3 ">
                            Ethnicity:
                          </div>
                          <div className=" font-light text-[5vw] font-robotocon -mt-[6px] ">
                            {selectedAppearance == "W" ? "Latino " : "Asian"}
                          </div>
                        </div>
                        <div className="flex  gap-2 items-center">
                          <div className=" font-cachetpro text-[5vw] font-semibold  leading-3 ">
                            Style:
                          </div>
                          <div className=" font-light text-[5vw] font-robotocon -mt-[6px] ">
                            Style{selectedClothing}
                          </div>
                        </div>
                        <div className="flex  gap-2 items-center">
                          <div className=" font-cachetpro text-[5vw] font-semibold  leading-3 ">
                            Body Type:
                          </div>
                          <div className=" font-light text-[5vw] font-robotocon -mt-[6px] ">
                            {selectedGender == "M" ? "Type 1" : "Type 2"}
                          </div>
                        </div>
                        <div className="flex  gap-2 items-center">
                          <div className=" font-cachetpro text-[5vw] font-semibold  leading-3 whitespace-nowrap ">
                            Gaming Setup:
                          </div>
                          <div className=" font-light text-[5vw] font-robotocon whitespace-nowrap -mt-[6px] ">
                            {/* ASSET_DATA name == S1A1  return title */}
                            {
                              ASSET_DATA.find(
                                (item) =>
                                  item.name ===
                                  `S${selectedSeries}A${selectedAsset}`
                              )?.title
                            }
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
                        href={
                          renderedResultImage ? renderedResultImage : undefined
                        }
                        target="_blank"
                        rel="noreferrer"
                        className={` transition-all duration-500 flex items-end justify-between bg-fuchsia-100/0 pl-[10%] relative`}
                      >
                        <div className=" absolute top-0 left-0 w-[12%]  ">
                          {renderedResultImage ? (
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
                              <div className=" w-[4vw]  aspect-square   animate-spin rounded-full border-4 border-solid border-white/50 border-e-transparent align-[-0.125em] text-surface"></div>
                            </div>
                          )}
                        </div>

                        <div
                          className={` ${"text-[#C7B299]"} font-cachetpro bg-sky-400/0 text-[5vw] underline`}
                        >
                          Download PC Wallpaper
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
                      className={` flex flex-col justify-center items-center gap-10 bg-orange-400/0 w-full `}
                    >
                      <a
                        href={
                          renderedResultImageMb ? renderedResultImageMb : ""
                        }
                        target="_blank"
                        rel="noreferrer"
                        className={` transition-all duration-500 flex items-end justify-between bg-fuchsia-100/0 pl-[10%] relative`}
                      >
                        <div className=" absolute top-0 left-0 w-[12%]  ">
                          {renderedResultImageMb ? (
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
                              <div className=" w-[4vw]  aspect-square   animate-spin rounded-full border-4 border-solid border-white/50 border-e-transparent align-[-0.125em] text-surface"></div>
                            </div>
                          )}
                        </div>

                        <div
                          className={` ${"text-[#C7B299]"} font-cachetpro bg-sky-400/0 text-[5vw] underline`}
                        >
                          Download Mobile Wallpaper
                        </div>
                      </a>
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
                    className="w-full bg-slate-700/0 px-[10%]  flex items-center h-full"
                  >
                    <div
                      className={` flex flex-col justify-center items-center gap-10 bg-orange-400/0 w-full `}
                    >
                      <div
                        onClick={handleVideoClick}
                        className={` transition-all duration-500 flex items-end justify-between bg-fuchsia-100/0 pl-[10%] relative`}
                      >
                        <div className=" absolute top-0 left-0 w-[20%]  ">
                          {renderedResultVideo ? (
                            <img
                              className=" absolute  left-0"
                              src={
                                IMAGE_URLS.ROG_NEO_GAMER_MD +
                                "final_play_icon.png"
                              }
                              alt=""
                            />
                          ) : (
                            <div className="absolute top-0 left-0 flex items-center justify-center w-full aspect-square ">
                              <div className=" w-[4vw]  aspect-square   animate-spin rounded-full border-4 border-solid  border-white/50 border-e-transparent align-[-0.125em] text-surface"></div>
                            </div>
                          )}
                        </div>

                        <div
                          className={` ${"text-[#C7B299]"} font-cachetpro bg-sky-400/0 text-[5vw] underline`}
                        >
                          Play Video
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          if (renderedResultVideo) {
                            downloadVideo(renderedResultVideo as string);
                          }
                        }}
                        className={` transition-all duration-500 flex items-end justify-between bg-fuchsia-100/0 pl-[10%] relative`}
                      >
                        <div className=" absolute top-0 left-0 w-[17%]  ">
                          {renderedResultVideo ? (
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
                              <div className=" w-[4vw]  aspect-square    animate-spin rounded-full border-4 border-solid border-white/50 border-e-transparent align-[-0.125em] text-surface"></div>
                            </div>
                          )}
                        </div>

                        <div
                          className={` ${"text-[rgb(199,178,153)]"} font-cachetpro bg-sky-400/0 text-[5vw] underline`}
                        >
                          Download Video
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
          <div className=" absolute w-full h-screen  z-40 flex justify-center items-center text-white  ">
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
                  className="pr-[55%] mb-[%]  "
                >
                  <div
                    className={`w-full h-auto  mt-[10%] overflow-hidden relative flex flex-col justify-start  bg-slate-400/0    ${"opacity-80 brightness-100 "}`}
                  >
                    <div className="w-[80%] bg-sky-600/0 flex flex-col gap-1 pt-[10%]">
                      <div className="flex  gap-2 items-center">
                        <div className=" font-cachetpro text-[1vw] font-semibold  leading-3 ">
                          SERIES:
                        </div>
                        <div className=" font-light text-[1vw] font-robotocon  -mt-[2%] ">
                          {
                            SERIES_DATA.find(
                              (item) => item.id === selectedSeries
                            )?.name
                          }
                        </div>
                      </div>
                      <div className=" font-light text-[1vw] font-robotocon ">
                        {
                          SERIES_DATA.find((item) => item.id === selectedSeries)
                            ?.description
                        }
                      </div>

                      <div className="flex  gap-2 items-center mt-[10%]">
                        <div className=" font-cachetpro text-[1vw] font-semibold  leading-3 ">
                          Ethnicity:
                        </div>
                        <div className=" font-light text-[1vw] font-robotocon -mt-[2%]">
                          {selectedAppearance == "W" ? "Latino " : "Asian"}
                        </div>
                      </div>
                      <div className="flex  gap-2 items-center">
                        <div className=" font-cachetpro text-[1vw] font-semibold  leading-3 ">
                          Style:
                        </div>
                        <div className=" font-light text-[1vw] font-robotocon -mt-[2%]">
                          Style{selectedClothing}
                        </div>
                      </div>
                      <div className="flex  gap-2 items-center">
                        <div className=" font-cachetpro text-[1vw] font-semibold  leading-3">
                          Body Type:
                        </div>
                        <div className=" font-light text-[1vw] font-robotocon ">
                          {selectedGender == "M" ? "Type 1" : "Type 2"}
                        </div>
                      </div>
                      <div className="flex  gap-2 items-center">
                        <div className=" font-cachetpro text-[1vw] font-semibold  leading-3 whitespace-nowrap ">
                          Gaming Setup:
                        </div>
                        <div className=" font-light text-[1vw] font-robotocon whitespace-nowrap -mt-[2%]">
                          {
                            ASSET_DATA.find(
                              (item) =>
                                item.name ===
                                `S${selectedSeries}A${selectedAsset}`
                            )?.title
                          }
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
                  <a
                    href={renderedResultImage ? renderedResultImage : ""}
                    target="_blank"
                    rel="noreferrer"
                    className={` flex items-end justify-between w-[78%] pl-[12%] relative transition-all duration-500  ${
                      renderedResultImage
                        ? "hover:scale-95 cursor-pointer  "
                        : " grayscale brightness-50 cursor-wait "
                    }`}
                  >
                    <div className=" absolute -top-1 left-0 w-[11%]  ">
                      {renderedResultImage ? (
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
                      Download PC Wallpaper
                    </div>
                  </a>
                  <a
                    href={renderedResultImageMb ? renderedResultImageMb : ""}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-end justify-between w-[78%] pl-[12%] relative transition-all duration-500  ${
                      renderedResultImageMb
                        ? "hover:scale-95 cursor-pointer  "
                        : " grayscale brightness-50 cursor-wait "
                    }`}
                  >
                    <div className=" absolute -top-1 left-0 w-[11%]">
                      {renderedResultImageMb ? (
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
                      Download Mobile Wallpaper
                    </div>
                  </a>
                  <a
                    href={renderedResultVideo ? renderedResultVideo : ""}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-end justify-between w-[78%] pl-[12%] relative transition-all duration-500  ${
                      renderedResultVideo
                        ? "hover:scale-95 cursor-pointer  "
                        : " grayscale brightness-50 cursor-wait "
                    }`}
                  >
                    <div className=" absolute -top-1 left-0 w-[11%]">
                      {renderedResultVideo ? (
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
                  </a>
                  <div
                    onClick={() => renderedResultVideo && setShowVideo(true)}
                    className={`flex items-end justify-between w-[78%] pl-[12%] relative transition-all duration-500  ${
                      renderedResultVideo
                        ? "hover:scale-95 cursor-pointer"
                        : "grayscale brightness-50 cursor-wait"
                    }`}
                  >
                    <div className="absolute -top-[2px] left-0 w-[10%]">
                      {renderedResultVideo ? (
                        <img
                          className="w-full"
                          src={
                            IMAGE_URLS.ROG_NEO_GAMER_MD + "final_play_icon.png"
                          }
                          alt=""
                        />
                      ) : (
                        <div className="absolute top-0 left-0 flex items-center justify-center w-full aspect-square">
                          <div className="w-[1vw] aspect-square animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface"></div>
                        </div>
                      )}
                    </div>
                    <div
                      className="font-cachetpro bg-contain w-[100%] bg-no-repeat bg-right-bottom bg-sky-400/0 text-[1.2vw]"
                      style={{
                        backgroundImage: `url('${
                          IMAGE_URLS.ROG_GAMER_CARD_GIF +
                          "/images/final_text_ui.png"
                        }')`,
                      }}
                    >
                      Play Video
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

          {renderedResultImage ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="h-screen bg-cover bg-center bg-no-repeat -z-0"
              style={{
                backgroundImage: `url('${renderedResultImage}')`,
              }}
            ></motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="h-screen  -z-0 bg-slate-700 animate-pulse w-full"
            ></motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 2,
            }}
            className="h-screen bg-cover bg-center bg-no-repeat z-10 mix-blend-multiply absolute top-0 left-0 w-full "
            style={{
              backgroundImage: `url('${
                IMAGE_URLS.ROG_GAMER_CARD_GIF + "/images/final_mask.png"
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
});

export default DownloadPage;
