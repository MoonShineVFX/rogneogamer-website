import { AppProvider } from "./context/AppContext";
import StepController from "./components/StepController";
import { ImageProvider } from "./context/ImageContext";
function App() {
  return (
    <ImageProvider>
      <AppProvider>
        <StepController />
      </AppProvider>
    </ImageProvider>
  );
}

export default App;
