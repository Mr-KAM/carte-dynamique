import { useEffect, useState } from "react";

export default function MapViz() {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/generate-map")
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
    <div>
      <img
        src={imageSrc}
        alt="Carte"
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
}
