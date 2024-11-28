import React, { useState, useRef, useCallback, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { IMAGE_URLS } from "../../helpers/constants";
import { motion } from "framer-motion";
import Resizer from "react-image-file-resizer";
import Webcam from "react-webcam";
import { Player } from "@lottiefiles/react-lottie-player";
import { useImage } from "../../context/ImageContext";
import useIsMobile from "../../hooks/useIsMobile";
import cameraC from "../../animationData/PC-camera-UI-front.json";
import lottie from "lottie-web";
import TypewriterTerminal from "../TypewriterTerminal";
interface CameraPageProps {
  onNext: () => void;
  onPrev: () => void;
}

const CameraPage = ({ onNext, onPrev }: CameraPageProps) => {
  const isMobile = useIsMobile();
  const {
    selectedSeries,
    selectedGender,
    selectedAppearance,
    selectedClothing,
    selectedAsset,
    setCapturedImage,
  } = useAppContext();
  const webcamRef = useRef<Webcam>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imageType, setImageType] = useState<"camera" | "upload">("camera");
  const { setBeforeImage } = useImage();
  const cameraC_Container = useRef<HTMLDivElement>(null);
  const videoConstraints2 = {
    aspectRatio: 1,
    facingMode: "user",
    width: { min: 300 },
    height: { min: 340 },
  };
  const videoConstraints = {
    aspectRatio: 0.8888887,
    facingMode: "user",
    width: { min: 300 },
    height: { min: 320 },
  };

  useEffect(() => {
    if (!cameraC_Container.current) return;

    const instance = lottie.loadAnimation({
      container: cameraC_Container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: cameraC,
    });

    return () => instance.destroy();
  }, []);

  //shot
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImageType("camera");
      handleClick(imageSrc);
    }
  }, [webcamRef]);
  //呼叫執行圖片處理
  const handleClick = async (photo: string | null | undefined) => {
    if (!photo) return;
    processCameraImage(photo);
  };
  //處理圖片壓縮與顯示
  const processCameraImage = async (photo: string) => {
    try {
      const files = await base64toFileList(photo);
      const compressedFile = await resizeFile(files[0]);
      setCapturedImage(compressedFile as File);
      // 確保 compressedFile 是 File 或 Blob
      if (compressedFile instanceof File || compressedFile instanceof Blob) {
        const formData = new FormData();
        formData.append("image", compressedFile);

        // 如果需要顯示預覽
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result as string);
          setBeforeImage(reader.result as string);
        };
        reader.readAsDataURL(compressedFile);
      }
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };
  //base64轉jpg
  function base64toFileList(base64String: string) {
    const byteCharacters = atob(base64String.split(",")[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const file = new File(byteArrays, "image.jpeg", { type: "image/jpeg" });

    return [file];
  }
  //壓縮圖片
  const resizeFile = (file: File): Promise<File | Blob> =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file, // 要處理的原始檔案
        1300, // 最大寬度（像素）
        1300, // 最大高度（像素）
        "JPEG", // 輸出的圖片格式
        100, // 圖片品質 (0-100)
        0, // 圖片旋轉角度
        (uri) => {
          resolve(uri as File);
        },
        "file"
      );
    });

  const onUploadBtnClick = () => {
    inputFileRef.current?.click();
  };
  const allowedImageTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/bmp",
  ];
  const onFilechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!allowedImageTypes.includes(file.type)) {
        alert("請上傳正確的圖片格式");
        return;
      }
      if (file.size > 12 * 1024 * 1024) {
        alert("請上傳小於12MB的圖片");
        return;
      }
      setCapturedImage(file as File);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);

        setBeforeImage(reader.result as string);
        setImageType("upload");
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (selectedSeries === null || selectedAsset === null) {
      console.log("Missing required selections");
      onPrev();
      return;
    }

    console.log("Selected Series:", selectedSeries);
    console.log("Selected Asset:", selectedAsset);
  }, [selectedSeries, selectedAsset, onPrev]);

  const handleNext = () => {
    if (selectedSeries === null || selectedAsset === null) {
      alert("請先完成所有選擇");
      return;
    }

    if (!image) {
      alert("請先拍攝或上傳照片");
      return;
    }

    onNext();
  };

  const handlePrev = () => {
    onPrev();
  };

  return (
    <div
      className="relative h-[100dvh] bg-left-top bg-no-repeat"
      style={{
        backgroundImage: `url('${IMAGE_URLS.ROG_NEO_GAMER + "p6_bg.png"}')`,
        backgroundSize: "100% 100%",
      }}
    >
      {isMobile ? (
        <div className="flex flex-col relative">
          {/* 紅光效果 */}
          <div className="max-w-full w-[100%] fixed bottom-0 left-0 -z-0 pointer-events-none animate-pulse">
            <img
              src={IMAGE_URLS.ROG_GAMER_CARD + "/images/mb/home_redglow_mb.png"}
              alt="glow"
            />
          </div>

          {/* 相機區域 */}
          <div className="w-full h-[85dvh] fixed top-0 mt-[3%]">
            {/* 上傳圖片顯示 */}
            {imageType === "upload" && image && (
              <div className="w-full h-full absolute z-40 flex items-center">
                <img
                  src={IMAGE_URLS.ROG_GAMER_CARD + "/images/camera_mask.png"}
                  alt="mask"
                  className="relative z-10 h-full w-full"
                />
                <motion.div
                  initial={{ opacity: 0, y: "-50%", x: "-50%" }}
                  animate={{ opacity: 1, y: "-50%", x: "-50%" }}
                  exit={{ opacity: 0, y: "-50%", x: "-50%" }}
                  className="absolute top-1/2 left-1/2 w-full h-full flex items-center"
                >
                  <img
                    src={image}
                    alt="Selected"
                    className="object-cover contrast-125 hue-rotate-15 w-full h-full"
                  />
                </motion.div>
              </div>
            )}

            {/* 相機框架動畫 */}
            <div className="relative w-[100%] h-[100dvh] mx-auto z-20">
              <Player
                src={
                  IMAGE_URLS.ROG_GAMER_CARD_GIF +
                  "/animationData/mb_camera_frame.json"
                }
                className="absolute -top-[5%] left-1/2 -translate-x-1/2 w-[100%] h-auto"
                loop
                autoplay
              />
              <Player
                src={
                  IMAGE_URLS.ROG_GAMER_CARD_GIF +
                  "/animationData/mb_camera_center.json"
                }
                className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-auto"
                loop
                autoplay
              />
            </div>

            {/* 相機預覽區域 */}
            <div className="absolute z-10 top-[40%] -translate-y-1/2 w-full aspect-[9/13]">
              {/* 相機遮罩 - 移到最上層 */}
              <div className="absolute top-0 left-0 w-full z-30">
                <img
                  src={IMAGE_URLS.ROG_GAMER_CARD + "/images/mb/camera_mask.png"}
                  alt="camera_mask"
                  className="w-full"
                />
              </div>

              {/* 預覽容器 */}
              <div className="relative w-full h-full">
                {/* 如果有拍攝的照片，顯示照片 */}
                {image ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-20"
                  >
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-full object-cover contrast-125 hue-rotate-15"
                    />
                  </motion.div>
                ) : (
                  /* 如果沒有照片，顯示相機預覽 */
                  <div className="absolute inset-0 z-10">
                    <Webcam
                      className="w-full h-full object-cover contrast-125 hue-rotate-15"
                      ref={webcamRef}
                      mirrored={true}
                      videoConstraints={videoConstraints2}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 控制按鈕 */}
            <div className="absolute bottom-[15%] z-50 w-full flex flex-col items-center gap-4">
              {/* 拍照/重設/確認按鈕 */}
              {image ? (
                <div className="flex gap-4 w-full justify-center">
                  <motion.div
                    key="reset"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="cursor-pointer w-[16%]"
                    onClick={() => setImage(null)}
                  >
                    <img
                      src={IMAGE_URLS.ROG_GAMER_CARD + "/images/reset_btn.png"}
                      alt="reset"
                      className="w-full hover:scale-95 transition-transform"
                    />
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  key="shot"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 0.95 }}
                  className="cursor-pointer w-[16%] mx-auto"
                  onClick={capture}
                >
                  <img
                    src={IMAGE_URLS.ROG_GAMER_CARD + "/images/camera_icon.png"}
                    alt="shot"
                    className="w-full"
                  />
                </motion.div>
              )}

              {/* 上傳按鈕 */}
              {!image && (
                <motion.div
                  className="w-full flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: "-8%" }}
                    exit={{ opacity: 0 }}
                    className="w-[45%] mx-auto"
                  >
                    <img
                      src={
                        IMAGE_URLS.ROG_GAMER_CARD + "/images/upload_button.png"
                      }
                      alt="upload"
                      className="hover:scale-95 cursor-pointer max-w-full w-full transition-transform"
                      onClick={onUploadBtnClick}
                    />
                  </motion.div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onFilechange}
                    style={{ display: "none" }}
                    ref={inputFileRef}
                  />
                </motion.div>
              )}
            </div>
          </div>

          {/* Next/Prev 按鈕 */}
          <div className="w-full pt-[7%] h-[15dvh] fixed bottom-0">
            <div className="flex justify-between w-[60%] mx-auto h-full relative">
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
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: "-54%" }}
            animate={{ opacity: 1, y: "-54%", x: "" }}
            exit={{ opacity: 0, y: "-54%" }}
            className="w-full h-full  absolute top-1/2 right-0 z-10   bg-slate-400/0"
          >
            <img
              src={
                IMAGE_URLS.ROG_GAMER_CARD + "/images/home_right_side_glow.png"
              }
              alt=""
              className="max-w-full h-screen absolute right-0 animate-pulse animate-infinite animate-alternate"
            />
            <img
              src={
                IMAGE_URLS.ROG_GAMER_CARD + "/images/home_left_side_glow.png"
              }
              alt=""
              className="max-w-full h-screen absolute left-0 animate-pulse animate-infinite animate-alternate"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="h-screen bg-cover bg-center bg-no-repeat z-0 absolute w-full top-0 left-0 "
            style={{
              backgroundImage: `url('${
                IMAGE_URLS.ROG_GAMER_CARD_GIF + "/images/camera_bg.png"
              }')`,
            }}
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, x: "-50%", y: "-50%" }}
            transition={{
              type: "spring",
              stiffness: 130,
              damping: 20,
              delay: 0.5,
            }}
            className="  absolute left-1/2  pointer-events-none z-50 flex w-[100%] top-1/2   px-[%] mix-blend-screen h-screen overflow- "
          >
            <div className="  w-full h-full  z-0 flex justify-center items-center  box-border relative bg-white/0">
              <div className="bg-fuchsia-600/0 flex w-[77%]  aspect-[17/9.5]">
                <div className="  relative  bg-yellow-500/0 w-[23%] mr-[3%] pt-[5%] pl-6 ">
                  <img
                    src={IMAGE_URLS.ROG_GAMER_CARD + "/images/L1.gif"}
                    alt=""
                    className="  absolute top-0 left-0 mix-blend-screen  max-w-full h-full "
                  />
                  <img
                    src={IMAGE_URLS.ROG_GAMER_CARD + "/images/L2.gif"}
                    alt=""
                    className=" absolute top-0 right-0 mix-blend-screen max-w-full h-full "
                  />
                  <div className=" w-full h-full flex flex-col justify-between pl-4  ">
                    <div className=" opacity-80 pt-[28%] text-white/80 ">
                      <div className=" font-cachetpro text-[1.4vw] font-semibold pt-[4%] leading-3 ">
                        SERIES :
                      </div>
                      <div className="mt-[7%] font-light text-[1.2vw] font-robotocon ">
                        <div>{selectedSeries}</div>
                      </div>
                    </div>
                    <div className="w-full h-[36%] mt-[12%] mb-[5vh]  flex flex-col justify-start  relative bg-slate-600/0  ">
                      <div className="flex items-center justify-start gap-3 opacity-80 mb-[3vh] max-h-[40px] bg-slate-500/0 text-white/80">
                        <div className="w-[80%] bg-sky-600/0 flex flex-col gap-1">
                          <div className="flex  gap-2 items-center">
                            <div className=" font-cachetpro text-[1.4vw] font-semibold  leading-3 ">
                              Gender:
                            </div>
                            <div className=" font-light text-[1.2vw] font-robotocon ">
                              {selectedGender}
                            </div>
                          </div>
                          <div className="flex  gap-2 items-center">
                            <div className=" font-cachetpro text-[1.4vw] font-semibold  leading-3 ">
                              Appearance:
                            </div>
                            <div className=" font-light text-[1.2vw] font-robotocon ">
                              {selectedAppearance}
                            </div>
                          </div>
                          <div className="flex  gap-2 items-center">
                            <div className=" font-cachetpro text-[1.4vw] font-semibold  leading-3 ">
                              Clothing:
                            </div>
                            <div className=" font-light text-[1.2vw] font-robotocon ">
                              {selectedClothing}
                            </div>
                          </div>
                          <div className="flex  gap-2 items-center">
                            <div className=" font-cachetpro text-[1.4vw] font-semibold  leading-3 ">
                              Asset:
                            </div>
                            <div className=" font-light text-[1.2vw] font-robotocon ">
                              {selectedAsset}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" relative bg-red-500/0  ">
                  {imageType === "upload" && image && (
                    <div className=" bg-green-400/0 w-full h-full absolute z-30 flex items-center">
                      <img
                        src={
                          IMAGE_URLS.ROG_GAMER_CARD + "/images/camera_mask.png"
                        }
                        alt="camera_mask"
                        className=" relative z-10 h-full "
                      />
                      <motion.div
                        initial={{ opacity: 0, y: "-50%", x: "-50%" }}
                        animate={{ opacity: 1, y: "-50%", x: "-50%" }}
                        exit={{ opacity: 0, y: "-50%", x: "-50%" }}
                        className="  absolute z-0 top-1/2 left-1/2  w-full h-full flex items-center  bg-red-400/0"
                      >
                        <img
                          src={image}
                          alt="Selected"
                          className=" object-cover contrast-125  hue-rotate-15 rounded-md border-0 border-white/0  w-full h-full    "
                        />
                      </motion.div>
                    </div>
                  )}

                  <div
                    className=" z-10 relative max-w-full h-full"
                    ref={cameraC_Container}
                  ></div>

                  <div className=" absolute z-0 top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 bg-emerald-300/0 w-full   ">
                    <div className="w-[100%] mx-auto absolute top-0 left-0  z-10 h-full    ">
                      <img
                        src={
                          IMAGE_URLS.ROG_GAMER_CARD + "/images/camera_mask.png"
                        }
                        alt="camera_mask"
                        className="z-10  absolute top-0 left-0 w-full "
                      />
                      {imageType === "camera" && image && (
                        <motion.div
                          initial={{ opacity: 0, y: "-50%", x: "-50%" }}
                          animate={{ opacity: 1, y: "-50%", x: "-50%" }}
                          exit={{ opacity: 0, y: "-50%", x: "-50%" }}
                          className="  absolute z-0 top-1/2 left-1/2  w-full h-full flex items-center  bg-red-400/0"
                        >
                          <img
                            src={image}
                            alt="Selected"
                            className=" object-cover contrast-125  hue-rotate-15 rounded-md border-0 border-white/0  w-full h-full    "
                          />
                        </motion.div>
                      )}
                    </div>

                    <Webcam
                      className="contrast-125  hue-rotate-15 w-[94%] mx-auto  "
                      ref={webcamRef}
                      mirrored={true}
                      width={"auto"}
                      videoConstraints={videoConstraints}
                    />
                  </div>
                </div>
                <div className="w-[20%] ml-auto bg-slate-400/0">
                  <TypewriterTerminal
                    lines={[
                      "AI SYSTEM ONLINE",
                      "ANALYZING BIO-METRICS...",
                      'Console.WriteLine("LEDGER UPDATED");',
                      "DATA SYNCHRONIZATION IN PROGRESS...",
                      "ALGORITHM OPTIMIZATION UNDERWAY...",
                      "VIRTUAL REALITY IMMERSION INITIATED",
                      'System.out.println("Σ(n^2) FROM n=1 TO ∞...");',
                      "BLOCKCHAIN VERIFIED",
                      "CRYPTOGRAPHIC ENCRYPTION ENABLED",
                      "BIOMETRIC AUTHENTICATION SECURE",
                      'console.log("ReLU Activation Function (threshold = 0.5)...");',
                      "AUGMENTED REALITY LOADING...",
                    ]}
                    interval={40}
                  />
                </div>

                <div className="  relative  bg-yellow-500/0 ml-auto">
                  <img
                    src={IMAGE_URLS.ROG_GAMER_CARD_GIF + "/images/R.gif"}
                    alt=""
                    className=" mix-blend-screen max-w-full h-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: "-50%" }}
            animate={{ opacity: 1, y: "-24%", x: "-30%" }}
            exit={{ opacity: 0, y: "-50%" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="  z-30  mx-auto  absolute top-1/2 right-[10%] w-[14%] aspect-[3/6] bg-zinc-500/0 "
          >
            <div className=" relative bg-pink-600/0 h-[55%] ">
              <img
                src={IMAGE_URLS.ROG_GAMER_CARD + "/images/camera_btn_line2.png"}
                alt="camera_btn_line"
                className="h-full aspect-square  absolute top-0 right-0"
              />
              {image ? (
                <motion.div
                  key="reset"
                  initial={{ opacity: 0, x: "-40%", y: "-40%" }}
                  animate={{ opacity: 1, x: "-50%", y: "-40%" }}
                  exit={{ opacity: 0, x: "-640%", y: "-40%" }}
                  whileHover={{ scale: "0.95" }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="left-0 absolute top-1/2 hover:scale-95 cursor-pointer w-[35%]"
                  onClick={() => setImage(null)}
                >
                  <img
                    src={IMAGE_URLS.ROG_GAMER_CARD + "/images/reset_btn.png"}
                    alt=""
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="shot"
                  initial={{ opacity: 0, x: "-40%", y: "-40%" }}
                  animate={{ opacity: 1, x: "-50%", y: "-40%" }}
                  exit={{ opacity: 0, x: "-40%", y: "-40%" }}
                  whileHover={{ scale: "0.95" }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="left-0 absolute top-1/2 hover:scale-95 cursor-pointer w-[35%]"
                  onClick={capture}
                >
                  <img
                    src={IMAGE_URLS.ROG_GAMER_CARD + "/images/camera_icon.png"}
                    alt="shot"
                    className="w-full"
                  />
                </motion.div>
              )}
            </div>

            <motion.div className="left-0  absolute bottom-0 flex flex-col bg-purple-600/0 w-full h-[45%]">
              <div className="w-[1px] h-[250px] bg-white/50 "></div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: "-8%" }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-[80%] "
              >
                <img
                  src={IMAGE_URLS.ROG_GAMER_CARD + "/images/upload_button.png"}
                  alt=""
                  className=" hover:scale-95 cursor-pointer w-full"
                  onClick={onUploadBtnClick}
                />
              </motion.div>
              <input
                type="file"
                accept="image/*"
                onChange={onFilechange}
                style={{ display: "none" }}
                ref={inputFileRef}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0, y: "-50%" }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className=" absolute    top-1/2  left-0 z-40 w-[10%] flex items-center"
          >
            <div className="h-[1px] w-[6vw] bg-white/70 mr-2"></div>
            <button
              onClick={handlePrev}
              className="w-[50%] text-[1vw] aspect-[90/40] text-white/80  bg-contain bg-left-top bg-no-repeat flex items-center justify-center hover:scale-95 font-cachet font-bold"
              style={{
                backgroundImage: `url('${
                  IMAGE_URLS.ROG_GAMER_CARD + "/images/redbutton_bg2.png"
                }')`,
              }}
            >
              Back
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1, x: 0, y: "-50%" }}
            exit={{ opacity: 0 }}
            className="absolute top-1/2 right-0 z-40 w-[10%] flex items-center"
          >
            <button
              onClick={handleNext}
              className={` w-[50%] text-[1vw] aspect-[90/40] text-white/80  bg-contain bg-left-top bg-no-repeat flex items-center justify-center hover:scale-95 font-cachet font-bold transition-all duration-700 ${
                image ? " opacity-100" : " opacity-20 "
              }`}
              style={{
                backgroundImage: `url('${
                  IMAGE_URLS.ROG_GAMER_CARD + "/images/redbutton_bg2.png"
                }')`,
              }}
            >
              Next
            </button>
            <div className="h-[1px] w-[6vw] bg-white/70 ml-2"></div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default CameraPage;
