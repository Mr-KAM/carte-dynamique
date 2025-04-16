import { Globe } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function EmptyMap() {
  return (
    <div className="flex h-[500px] items-center justify-center rounded-lg border">
      <div className="flex flex-col items-center gap-2 text-center">
        <Globe className="h-10 w-10 text-muted-foreground" />
        <h3 className="text-lg font-medium">Visualisation Carte</h3>
        <p className="text-sm text-muted-foreground">
          "Importez des données pour visualiser la carte"
        </p>
        <Link href={"/importer"}>
          <Button variant="outline" size="sm" className="mt-2">
            Importer des données
          </Button>
        </Link>
      </div>
    </div>
  );
}
