import { useCSVStore } from "@/store/useCSVStore";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Papa from "papaparse";
import { CSVFile } from "@/store/useCSVStore";

export default function useCSVUploader() {
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileSuccess, setFileSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { csvData, setCSVData, resetCSVData } = useCSVStore();

  useEffect(() => {
    const savedCSV = sessionStorage.getItem("csvData");

    if (savedCSV) {
      try {
        const parsed = JSON.parse(savedCSV);
        if (Array.isArray(parsed)) {
          setCSVData(parsed);
        }
      } catch (error) {
        console.warn("Erreur de parsing sessionStorage", error);
      }
    }
  }, [setCSVData]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileError(null);
    setFileSuccess(null);
    resetCSVData();

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setFileError("Le fichier doit être au format CSV");
      return;
    }

    Papa.parse<CSVFile>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;

        if (!Array.isArray(data) || data.length === 0) {
          setFileError("Le fichier CSV est vide ou mal formaté.");
          return;
        }

        const requiredColumns = ["Regions", "Valeurs"];
        const firstRow = data[0];
        const missingColumns = requiredColumns.filter(
          (col) => !(col in firstRow)
        );

        if (missingColumns.length > 0) {
          setFileError(`Colonnes manquantes: ${missingColumns.join(", ")}`);
          return;
        }

        setCSVData(data);
        setFileSuccess(`Fichier importé avec succès: ${data.length} lignes`);
      },
      error: (error) => {
        console.error("Erreur PapaParse:", error);
        setFileError("Erreur lors de la lecture du fichier.");
      },
    });
  };

  return {
    csvData,
    fileError,
    fileSuccess,
    fileInputRef,
    handleFileUpload,
  };
}
