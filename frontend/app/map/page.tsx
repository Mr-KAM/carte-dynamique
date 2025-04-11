"use client";
import { Button } from "@/components/ui/button";
import useCSVUploader from "@/hooks/useCSVUploader";
import { ArrowDownToLine } from "lucide-react";

export default function Map() {
  const { csvData } = useCSVUploader();

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6">Visualisation Carte</h1>
      <div className="h-10/12 bg-muted/50 rounded-lg border flex items-center justify-center">
        Carte des indicateurs
      </div>

      <Button variant={"orange"} className="mt-6" disabled={!csvData}>
        <ArrowDownToLine />
        Enregistrer image
      </Button>
    </div>
  );
}
