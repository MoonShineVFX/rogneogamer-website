// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";

// 註釋掉應用程式的渲染
createRoot(document.getElementById("root")!).render(
  <div style={{ width: "100vw", height: "100vh", background: "#000" }} />
  // <StrictMode>
  //   <App />
  // </StrictMode>
);
