import React, { useState, useRef, useCallback, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { IMAGE_URLS } from "../../helpers/constants";
import { motion } from "framer-motion";
import Resizer from "react-image-file-resizer";
import Webcam from "react-webcam";
import { Player } from "@lottiefiles/react-lottie-player";
import { useImage } from "../../context/ImageContext";

interface CameraPageProps {
  onNext: () => void;
  onPrev: () => void;
}

const CameraPage = ({ onNext, onPrev }: CameraPageProps) => {
  const {
    selectedSeries,
    selectedGender,
    selectedAppearance,
    selectedClothing,
    selectedAsset,
  } = useAppContext();
  const webcamRef = useRef<Webcam>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imageType, setImageType] = useState<"camera" | "upload">("camera");
  const { setBeforeImage } = useImage();

  const videoConstraints2 = {
    width: 720,
    height: 1280,
    facingMode: "user",
  };

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
        file,
        300,
        400,
        "JPEG",
        70,
        0,
        (uri) => {
          resolve(uri as File);
        },
        "file"
      );
    });

  const onUploadBtnClick = () => {
    inputFileRef.current?.click();
  };

  const onFilechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
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

      {/* 在界面上顯示選擇的內容（如果需要） */}
      <div className="absolute top-4 left-4 text-white/80">
        <div>Series: {selectedSeries}</div>

        <div>Gender: {selectedGender}</div>
        <div>Appearance: {selectedAppearance}</div>
        <div>Clothing: {selectedClothing}</div>
        <div>Asset: {selectedAsset}</div>
      </div>
    </div>
  );
};

export default CameraPage;
