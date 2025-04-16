"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { CSVFile } from "@/store/useCSVStore";

export default function VisualizFirstRow({ data }: { data: CSVFile[] | null }) {
  console.log("Contenu du data :", data);

  return (
    <div>
      {data && data.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Aperçu des données</h3>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(data[0]).map((header) => (
                    <TableHead key={header}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.slice(0, 5).map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value, i) => (
                      <TableCell key={i}>{value.toString()}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {data.length > 5 && (
            <p className="text-sm text-muted-foreground mt-2">
              Affichage de 5 lignes sur {data.length}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
