import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Import() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Importer des Données</h1>
      <div className="flex flex-col items-start max-w-md bg-card p-6 rounded-lg border shadow-sm">
        <Label htmlFor="file">Importer un fichier CSV</Label>
        <div className="flex gap-2 mt-3">
          <Input id="file" type="file" accept=".csv" />
          <Button className="cursor-pointer">Importer</Button>
        </div>
      </div>
    </div>
  );
}
