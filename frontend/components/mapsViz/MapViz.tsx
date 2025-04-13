import { useEffect, useState } from "react";
import { useCustomMapStore } from "@/store/useCustomMapStore";

export default function MapViz() {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  const { title, selectedPalette, legend } = useCustomMapStore();

  useEffect(() => {
    fetch(
      `http://localhost:8000/generate-map?title=${encodeURIComponent(
        title
      )}&cmap=${selectedPalette}&label_title=${encodeURIComponent(legend)}`
    )
      .then((res) => res.blob())
      .then((imageBlob: Blob) => {
        const imageObjectUrl = URL.createObjectURL(imageBlob);
        setImageSrc(imageObjectUrl);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération d'image", error)
      );
  }, []);

  return (
    <img
      src={imageSrc}
      alt="Carte"
      className="max-w-full max-h-full object-contain"
    />
  );
}
