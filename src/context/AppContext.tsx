import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  displayName: string;
  selectedSeries: number;
  selectedGender: "male" | "female";
  selectedAppearance: number;
  selectedClothing: number;
  selectedAsset: number;
  previewImages: string[];
  userPhoto: string | null;
  resultImages: string[];
  selectedStyle: string | null;
  setDisplayName: (name: string) => void;
  setSelectedSeries: (series: number) => void;
  setSelectedGender: (gender: "male" | "female") => void;
  setSelectedAppearance: React.Dispatch<React.SetStateAction<number>>;
  setSelectedClothing: React.Dispatch<React.SetStateAction<number>>;
  setSelectedAsset: (asset: number) => void;
  setPreviewImages: (images: string[]) => void;
  setUserPhoto: (photo: string) => void;
  setResultImages: (images: string[]) => void;
  setSelectedStyle: (style: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [displayName, setDisplayName] = useState("");
  const [selectedSeries, setSelectedSeries] = useState(0);
  const [selectedGender, setSelectedGender] = useState<"male" | "female">(
    "male"
  );
  const [selectedAppearance, setSelectedAppearance] = useState(0);
  const [selectedClothing, setSelectedClothing] = useState(0);
  const [selectedAsset, setSelectedAsset] = useState(0);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [resultImages, setResultImages] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        displayName,
        selectedSeries,
        selectedGender,
        selectedAppearance,
        selectedClothing,
        selectedAsset,
        previewImages,
        userPhoto,
        resultImages,
        selectedStyle,
        setDisplayName,
        setSelectedSeries,
        setSelectedGender,
        setSelectedAppearance,
        setSelectedClothing,
        setSelectedAsset,
        setPreviewImages,
        setUserPhoto,
        setResultImages,
        setSelectedStyle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
