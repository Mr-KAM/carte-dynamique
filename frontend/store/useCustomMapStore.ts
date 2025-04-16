import { create } from "zustand";

interface MapStore {
  title: string;
  selectedPalette: string;
  legend: string;
  setTitle: (title: string) => void;
  setSelectedPalette: (palette: string) => void;
  setLegend: (legend: string) => void;
}

export const useCustomMapStore = create<MapStore>((set) => ({
  title: "Indicateurs", // Valeur par défaut
  selectedPalette: "Blues", // Valeur par défaut
  legend: "Echelle", // Valeur par défaut
  setTitle: (title) => set({ title }),
  setSelectedPalette: (palette) => set({ selectedPalette: palette }),
  setLegend: (legend) => set({ legend }),
}));
