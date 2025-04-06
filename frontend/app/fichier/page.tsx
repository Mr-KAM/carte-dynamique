"use client";

import { CsvImporter } from "../../components/CVSimporter";
import { useState } from "react";

export default function Page() {
  const [csvData, setCsvData] = useState<CSVData[] | null>(null);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Importation de CSV</h1>
      <CsvImporter onDataParsed={setCsvData} />
      {/* Optionnel : preview des données importées */}
      {csvData && (
        <pre className="mt-4 bg-gray-100 p-2 rounded">
          {JSON.stringify(csvData, null, 2)}
        </pre>
      )}
    </div>
  );
}
