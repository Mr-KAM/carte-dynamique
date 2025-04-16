"use client";
import CustomMap from "@/components/mapsViz/CustomMap";
import MapViz from "@/components/mapsViz/MapViz";
import { Button } from "@/components/ui/button";
import useCSVUploader from "@/hooks/useCSVUploader";
import { ArrowDownToLine } from "lucide-react";

export default function Map() {
  const { csvData } = useCSVUploader();

  const handleSaveImage = () => {
    const img = document.querySelector("img[alt='Carte']") as HTMLImageElement;
    if (img && img.src.startsWith("data:image")) {
      const link = document.createElement("a");
      link.href = img.src;
      link.download = "map-image.png";
      link.click();
    } else {
      alert("Aucune image de carte à enregistrer.");
    }
  };

  return (
    <>
      <div className="p-6 w-full h-full">
        <h1 className="text-2xl font-bold mb-6">Visualisation Carte</h1>
        {csvData ? (
          <div>
            <CustomMap />
            <div className="mt-5 bg-muted/50 rounded-lg border flex items-center justify-center">
              <MapViz />
            </div>
          </div>
        ) : (
          <span className="h-10/12 bg-muted/50 rounded-lg border flex items-center justify-center">
            Carte des indicateurs
          </span>
        )}
        <Button
          variant={"orange"}
          className="mt-6"
          disabled={!csvData}
          onClick={handleSaveImage}
        >
          <ArrowDownToLine />
          Enregistrer image
        </Button>
      </div>
    </>
  );
}
