"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AlertCircle, CheckCircle2, Globe, Upload } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

interface CSVData {
  region: string;
  variable: string;
  data: string | number;
  [key: string]: string | number;
}

export default function ImportData() {
  const [csvData, setCsvData] = useState<CSVData[] | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileSuccess, setFileSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState("dashboard");

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
        const requiredColumns = ["Regions", "Valeurs", "Variable", "Année"];
        const missingColumns = requiredColumns.filter(
          (col) => !headers.includes(col)
        );

        if (missingColumns.length > 0) {
          setFileError(
            `Colonnes manquantes: ${missingColumns.join(
              ", "
            )}. Le fichier doit contenir ces colonnes`
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

          const row: CSVData = { region: "", variable: "", data: "" };
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

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Importer des Données</CardTitle>
        <CardDescription>
          Importez un fichier CSV contenant les données pour votre carte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="flex flex-col h-[200px] items-center justify-center rounded-lg border border-dashed cursor-pointer"
          onClick={triggerFileInput}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".csv"
            onChange={handleFileUpload}
          />
          <div className="flex flex-col items-center gap-2 text-center p-4">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-medium">Importer un fichier CSV</h3>
            <p className="text-sm text-muted-foreground">
              Le fichier doit contenir les colonnes &apos;Regions&apos;,
              &apos;Valeurs&apos;, &apos;Variable&apos; et &apos;Année&apos;
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              Parcourir les fichiers
            </Button>
          </div>
        </div>

        {fileError && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{fileError}</AlertDescription>
          </Alert>
        )}

        {fileSuccess && (
          <Alert
            variant="default"
            className="mt-4 bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-50"
          >
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Succès</AlertTitle>
            <AlertDescription>{fileSuccess}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          variant="orange"
          disabled={!csvData}
          onClick={() => setActiveTab("map")}
        >
          <Globe className="mr-2 h-4 w-4" />
          Visualiser sur la carte
        </Button>
      </CardFooter>
    </Card>
  );
}
