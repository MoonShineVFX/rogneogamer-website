import { useState } from "react";
import HomePage from "./steps/HomePage";
import SeriesChoosePage from "./steps/SeriesChoosePage";
import StyleChoosePage from "./steps/StyleChoosePage";
import AssetChoosePage from "./steps/AssetChoosePage";
import PreviewPage from "./steps/PreviewPage";
import CameraPage from "./steps/CameraPage";
import DownloadPage from "./steps/DownloadPage";

const StepController = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { component: <HomePage onNext={() => setCurrentStep(1)} /> },
    {
      component: (
        <SeriesChoosePage
          onNext={() => setCurrentStep(2)}
          onPrev={() => setCurrentStep(0)}
        />
      ),
    },
    {
      component: (
        <StyleChoosePage
          onNext={() => setCurrentStep(3)}
          onPrev={() => setCurrentStep(1)}
        />
      ),
    },
    {
      component: (
        <AssetChoosePage
          onNext={() => setCurrentStep(4)}
          onPrev={() => setCurrentStep(2)}
        />
      ),
    },
    {
      component: (
        <PreviewPage
          onNext={() => setCurrentStep(5)}
          onPrev={() => setCurrentStep(3)}
        />
      ),
    },
    {
      component: (
        <CameraPage
          onNext={() => setCurrentStep(6)}
          onPrev={() => setCurrentStep(4)}
        />
      ),
    },
    {
      component: <DownloadPage onPrev={() => setCurrentStep(5)} />,
    },
  ];

  return <div className="min-h-screen">{steps[currentStep].component}</div>;
};

export default StepController;
