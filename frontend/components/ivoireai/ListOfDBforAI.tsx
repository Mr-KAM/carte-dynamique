import { Database } from "lucide-react";
import { TabsContent } from "../ui/tabs";

export default function ListOfDBforAI() {
  return (
    <TabsContent
      value="data"
      className="flex-1 flex flex-col items-center justify-center p-4 m-0"
    >
      <div className="text-center max-w-md">
        <Database className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-medium mb-2">
          Sources de données connectées
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          L'assistant IA est connecté aux bases de données suivantes :
        </p>
        <div className="space-y-2 text-left">
          <div className="flex items-center gap-2 p-2 border rounded-md">
            <Database className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">Base EFTP Principale</p>
              <p className="text-xs text-muted-foreground">
                12 tables, dernière mise à jour: 02/04/2025
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 border rounded-md">
            <Database className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">Statistiques Régionales</p>
              <p className="text-xs text-muted-foreground">
                5 tables, dernière mise à jour: 28/03/2025
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 border rounded-md">
            <Database className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">Données Géographiques</p>
              <p className="text-xs text-muted-foreground">
                3 tables, dernière mise à jour: 15/03/2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
