import { useEffect, useRef, useState } from "react";
import { useCustomMapStore } from "@/store/useCustomMapStore";

export default function MapViz() {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  const { title, selectedPalette, legend } = useCustomMapStore();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentParams = JSON.stringify({ title, selectedPalette, legend });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
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
            const reader = new FileReader();
            reader.onload = () => {
              const base64data = reader.result as string;
              setImageSrc(base64data);
              sessionStorage.setItem("mapImage", base64data);
              sessionStorage.setItem("mapImageParams", currentParams);
            };
            reader.readAsDataURL(imageBlob);
          })
          .catch((error) =>
            console.error("Erreur lors de la récupération d'image", error)
          );
      }
    }, 1500);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [title, selectedPalette, legend]);

  return (
    <img
      src={imageSrc}
      alt="Carte"
      className="max-w-full max-h-full object-contain"
    />
  );
}
