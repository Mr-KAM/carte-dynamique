import React, { ChangeEvent, useRef, useState } from "react";

export interface CSVData {
  region: string;
  variable: string;
  date: string;
  Num: string;
  data: string | number;
  [key: string]: string | number;
}

export default function useCSVUploader() {
  const [csvData, setCsvData] = useState<CSVData[] | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileSuccess, setFileSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileError(null);
    setFileSuccess(null);
    setCsvData(null);

    if (!file) return;

    // Vérifier l'extension du fichier
    if (!file.name.endsWith(".csv")) {
      setFileError("Le fichier doit être au format CSV");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split("\n");
        const headers = lines[0].split(",").map((header) => header.trim());

        // Vérifier que les colonnes requises sont présentes
        const requiredColumns = ["region", "variable", "data", "Num", "date"];
        const missingColumns = requiredColumns.filter(
          (col) => !headers.includes(col)
        );

        if (missingColumns.length > 0) {
          setFileError(
            `Colonnes manquantes: ${missingColumns.join(
              ", "
            )}. Le fichier doit contenir les colonnes "region", "variable", "data", "Num" et "date"`
          );
          return;
        }

        // Parser les données
        const parsedData: CSVData[] = [];
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim() === "") continue;

          const values = lines[i].split(",").map((value) => value.trim());
          if (values.length !== headers.length) {
            setFileError(
              `Erreur à la ligne ${i + 1}: nombre de valeurs incorrect`
            );
            return;
          }

          const row: CSVData = {
            region: "",
            variable: "",
            data: "",
            Num: "",
            date: "",
          };
          headers.forEach((header, index) => {
            row[header] =
              header === "data" && !isNaN(Number(values[index]))
                ? Number(values[index])
                : values[index];
          });

          parsedData.push(row);
        }

        setCsvData(parsedData);
        setFileSuccess(
          `Fichier importé avec succès: ${parsedData.length} lignes de données`
        );
      } catch (error) {
        setFileError("Erreur lors de l'analyse du fichier CSV");
        console.error(error);
      }
    };

    reader.onerror = () => {
      setFileError("Erreur lors de la lecture du fichier");
    };

    reader.readAsText(file);
  };

  return {
    csvData,
    fileError,
    fileSuccess,
    fileInputRef,
    handleFileUpload,
  };
}
