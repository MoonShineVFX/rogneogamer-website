import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useIsMobile from "../../hooks/useIsMobile";
import { IMAGE_URLS } from "../../helpers/constants";
import ReactPlayer from "react-player";
interface ScreenProgressProps {
  duration?: number; // 可選參數，預設 10000ms (10秒)
  onComplete?: () => void; // 可選的完成回調
}

const ScreenProgress = ({
  duration = 10000,
  onComplete,
}: ScreenProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const isMobile = useIsMobile();
  useEffect(() => {
    const interval = 50; // 每50ms更新一次
    const steps = duration / interval;
    const increment = 100 / steps;
    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress += increment;
      setProgress(Math.min(currentProgress, 100));

      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.(); // 如果有提供回調函數就調用
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center "
    >
      {isMobile ? (
        <>
          {/* <div className=" fixed w-full h-[100dvh] top-0 left-0 -z-10 overflow-hidden">
          <div className=" absolute w-full h-0 top-0 left-0 pb-[177%] clear-both">
            <iframe
              src="https://player.vimeo.com/video/952184920?background=1&autoplay=1&loop=1&byline=0&title=0&quality=1080p"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Vimeo Video"
              className=' absolute top-0 left-0 w-full h-full'
            ></iframe>
          </div>
        </div> */}
          <div className="vimeo-wrapper">
            <ReactPlayer
              url="https://r2.web.moonshine.tw/msweb/roggamercard/videos/mb_loading.mp4"
              className="react-player"
              playing
              playsinline
              muted
              loop
              width="100vw"
              height="56.25vw"
              config={{ vimeo: { playerOptions: { background: true } } }}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: "-50%", y: -20 }}
            animate={{ opacity: 1, x: "-50%", y: 0 }}
            exit={{ opacity: 0, x: "-50%", y: -20 }}
            transition={{
              type: "spring",
              stiffness: 130,
              damping: 20,
              delay: 0.3,
            }}
            className=" fixed bottom-10 max-w-full w-[90%]   z-40 left-1/2"
          >
            <div className="w-full relative">
              <div className="progress-bar flex items-center font-robotocon text-[4.5vw] text-white/80 mb-5">
                <div>GENERATING...</div>
                {progress}%
              </div>
              <img
                src={IMAGE_URLS.ROG_GAMER_CARD + "/images/mb/loading_ui_mb.svg"}
                alt=""
                className="w-full"
              />
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <div className=" fixed w-full h-full top-0 left-0 -z-10 overflow-hidden">
            <div className=" absolute w-full h-0 top-0 left-0 pb-[56.2%] clear-both">
              <iframe
                src="https://player.vimeo.com/video/951924287?background=1&autoplay=1&loop=1&byline=0&title=0"
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Vimeo Video"
                className=" absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: "-50%", y: -20 }}
            animate={{ opacity: 1, x: "-50%", y: 0 }}
            exit={{ opacity: 0, x: "-50%", y: -20 }}
            transition={{
              type: "spring",
              stiffness: 130,
              damping: 20,
              delay: 0.3,
            }}
            className=" absolute bottom-24 max-w-full w-4/5   z-40 left-1/2"
          >
            <div className="w-full relative flex  items-center justify-between">
              <div className="w-full">
                <img
                  src={IMAGE_URLS.ROG_GAMER_CARD_GIF + "/images/loading_ui.png"}
                  alt=""
                  className="w-full"
                />
              </div>

              <div className="progress-bar flex items-center font-cachet justify-end gap-4  bottom-5 right-0  absolute  w-[50%] bg-zinc-70/0">
                <div className="text-white">GENERATING...</div>
                <div className="w-full bg-gray-700 rounded-full h-[1px] mb-0">
                  <motion.div
                    className="bg-white h-full rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="text-white text-center">
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default ScreenProgress;
