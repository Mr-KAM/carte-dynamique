import React from "react";
import { TabsContent } from "../ui/tabs";
import { FileText } from "lucide-react";

export default function ListOfdocumentsforAI() {
  return (
    <TabsContent
      value="docs"
      className="flex-1 flex flex-col items-center justify-center p-4 m-0"
    >
      <div className="text-center max-w-md">
        <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-medium mb-2">Documents intégrés</h3>
        <p className="text-sm text-muted-foreground mb-4">
          L'assistant IA a accès aux documents suivants pour répondre à vos
          questions :
        </p>
        <div className="space-y-2 text-left">
          <div className="flex items-center gap-2 p-2 border rounded-md">
            <FileText className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">Rapport Annuel EFTP 2024</p>
              <p className="text-xs text-muted-foreground">PDF, 48 pages</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 border rounded-md">
            <FileText className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">Guide des Formations</p>
              <p className="text-xs text-muted-foreground">PDF, 124 pages</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 border rounded-md">
            <FileText className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">Statistiques par Région</p>
              <p className="text-xs text-muted-foreground">
                Excel, 15 feuilles
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 border rounded-md">
            <FileText className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">Normes et Standards EFTP</p>
              <p className="text-xs text-muted-foreground">PDF, 36 pages</p>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
