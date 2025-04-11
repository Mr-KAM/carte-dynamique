"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCSVUploader from "@/hooks/useCSVUploader";
import { FileUp, Globe } from "lucide-react";
import CustomAlert from "./CustomAlert";
import VisualizFirstRow from "./VisualizFirstRow";
import Link from "next/link";

export default function UploadData() {
  const { csvData, fileError, fileSuccess, fileInputRef, handleFileUpload } =
    useCSVUploader();

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
            <FileUp className="h-10 w-10 text-muted-foreground" />
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
        <CustomAlert {...{ fileError, fileSuccess }} />
        <VisualizFirstRow data={csvData} />
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Link href={"/map"}>
          <Button variant="orange" disabled={!csvData}>
            <Globe className="mr-2 h-4 w-4" />
            Visualiser sur la carte
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
