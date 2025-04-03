import { Button } from "@/components/ui/button";

export default function Map() {
  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6">Visualisation Carte</h1>
      <div className="h-10/12 bg-muted/50 rounded-lg border flex items-center justify-center">
        Carte des indicateurs
      </div>
      <Button className="mt-6 cursor-pointer">Enregistrer image</Button>
    </div>
  );
}
