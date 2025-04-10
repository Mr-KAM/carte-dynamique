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
import UseCsvUploader from "@/hooks/UseCsvUploader";

import { AlertCircle, CheckCircle2, Globe, Table, Upload } from "lucide-react";

export default function ImportData() {
  const { csvData, fileError, fileSuccess, fileInputRef, handleFileUpload } =
    UseCsvUploader();

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  console.log("Contenu du CSV :", csvData);

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
              Le fichier doit contenir les colonnes &apos;region&apos;, &
              &apos;variable&apos; et &apos;date&apos;
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
        <Button variant="orange" disabled={!csvData}>
          <Globe className="mr-2 h-4 w-4" />
          Visualiser sur la carte
        </Button>
      </CardFooter>
    </Card>
  );
}
