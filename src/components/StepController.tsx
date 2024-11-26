import { useState } from "react";
import useIsMobile from "../hooks/useIsMobile";
import HomePage from "./steps/HomePage";
import SeriesChoosePage from "./steps/SeriesChoosePage";
import StyleChoosePage from "./steps/StyleChoosePage";
import AssetChoosePage from "./steps/AssetChoosePage";
import PreviewPage from "./steps/PreviewPage";
import CameraPage from "./steps/CameraPage";
import DownloadPage from "./steps/DownloadPage";
import DesktopChoosePage from "./steps/DesktopChoosePage";

const StepController = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const isMobile = useIsMobile();

  const renderStep = () => {
    if (isMobile) {
      // 手機版：保持原有的步驟流程
      switch (currentStep) {
        case 1:
          return <HomePage onNext={() => setCurrentStep(2)} />;
        case 2:
          return (
            <SeriesChoosePage
              onNext={() => setCurrentStep(3)}
              onPrev={() => setCurrentStep(1)}
              isDesktop={false}
            />
          );
        case 3:
          return (
            <StyleChoosePage
              onNext={() => setCurrentStep(4)}
              onPrev={() => setCurrentStep(2)}
              isDesktop={false}
            />
          );
        case 4:
          return (
            <AssetChoosePage
              onNext={() => setCurrentStep(5)}
              onPrev={() => setCurrentStep(3)}
              isDesktop={false}
            />
          );
        // del BgChoosePage

        case 5:
          return (
            <PreviewPage
              onNext={() => setCurrentStep(6)}
              onPrev={() => setCurrentStep(4)}
            />
          );
        case 6:
          return (
            <CameraPage
              onNext={() => setCurrentStep(7)}
              onPrev={() => setCurrentStep(5)}
            />
          );
        case 7:
          return (
            <DownloadPage
              onNext={() => setCurrentStep(0)}
              onPrev={() => setCurrentStep(6)}
            />
          );
        default:
          return <HomePage onNext={() => setCurrentStep(2)} />;
      }
    } else {
      // 桌面版：合併選擇步驟
      switch (currentStep) {
        case 1:
          return <HomePage onNext={() => setCurrentStep(2)} />;
        case 2:
          return (
            <DesktopChoosePage
              onNext={() => setCurrentStep(3)}
              onPrev={() => setCurrentStep(1)}
            />
          );
        case 3:
          return (
            <PreviewPage
              onNext={() => setCurrentStep(4)}
              onPrev={() => setCurrentStep(2)}
            />
          );
        case 4:
          return (
            <CameraPage
              onNext={() => setCurrentStep(5)}
              onPrev={() => setCurrentStep(3)}
            />
          );
        case 5:
          return (
            <DownloadPage
              onNext={() => setCurrentStep(0)}
              onPrev={() => setCurrentStep(4)}
            />
          );
        default:
          return <HomePage onNext={() => setCurrentStep(2)} />;
      }
    }
  };

  return <div className="min-h-screen bg-black">{renderStep()}</div>;
};

export default StepController;
