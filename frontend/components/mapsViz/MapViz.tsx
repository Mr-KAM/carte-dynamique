import { useEffect, useState } from "react";
import { useCustomMapStore } from "@/store/useCustomMapStore";

export default function MapViz() {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  const { title, selectedPalette, legend } = useCustomMapStore();

  useEffect(() => {
    const currentParams = JSON.stringify({ title, selectedPalette, legend });

    const timeout = setTimeout(() => {
      const MapImageStored = sessionStorage.getItem("mapImage");
      const MapParamsStored = sessionStorage.getItem("mapImageParams");

      if (MapImageStored && MapParamsStored === currentParams) {
        setImageSrc(MapImageStored);
      } else {
        fetch(
          `http://localhost:8000/generate-map?title=${encodeURIComponent(
            title
          )}&cmap=${selectedPalette}&label_title=${encodeURIComponent(legend)}`
        )
          .then((res) => res.blob())
          .then((imageBlob: Blob) => {
            const imageObjectUrl = URL.createObjectURL(imageBlob);
            setImageSrc(imageObjectUrl);
            sessionStorage.setItem("mapImage", imageObjectUrl);
            sessionStorage.setItem("mapImageParams", currentParams);
          })
          .catch((error) =>
            console.error("Erreur lors de la récupération d'image", error)
          );
      }
    }, 600);
    return () => clearTimeout(timeout);
  }, [title, selectedPalette, legend]);

  return (
    <img
      src={imageSrc}
      alt="Carte"
      className="max-w-full max-h-full object-contain"
    />
  );
}
