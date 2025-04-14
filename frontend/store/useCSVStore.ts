import { create } from "zustand";

export interface CSVFile {
  Regions: string;
  Valeurs: number;
}

interface CSVState {
  csvData: CSVFile[] | null;
  setCSVData: (data: CSVFile[]) => void;
  resetCSVData: () => void;
}

export const useCSVStore = create<CSVState>((set) => ({
  csvData: null,
  setCSVData: (data) => set({ csvData: data }),
  resetCSVData: () => set({ csvData: null }),
}));
