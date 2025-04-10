"use client"
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface CSVData {
  region: string;
  variable: string;
  data: string | number;
  [key: string]: string | number;
}

const [csvData, setCsvData] = useState<CSVData[] | null>(null);

export default function VisualizFirstRow() {
  return (
    <div>
      {csvData && csvData.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Aperçu des données</h3>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(csvData[0]).map((header) => (
                    <TableHead key={header}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {csvData.slice(0, 5).map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value, i) => (
                      <TableCell key={i}>{value.toString()}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {csvData.length > 5 && (
            <p className="text-sm text-muted-foreground mt-2">
              Affichage de 5 lignes sur {csvData.length}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
