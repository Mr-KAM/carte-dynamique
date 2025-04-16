import { CSVFile } from "@/store/useCSVStore";

function convertToCSVText(data: CSVFile[]): string {
  if (data.length === 0) return "";

  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((field) => row[field as keyof typeof row]).join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}
export default convertToCSVText;
