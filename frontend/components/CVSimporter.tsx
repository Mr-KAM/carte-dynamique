"use client"

import { useRef, useState, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, AlertCircle, CheckCircle2 } from "lucide-react"

export interface CSVData {
  region: string
  variable: string
  data: string | number
  [key: string]: string | number
}

interface CsvImporterProps {
  onDataParsed: (data: CSVData[]) => void
}

export const CsvImporter: React.FC<CsvImporterProps> = ({ onDataParsed }) => {
  const [fileError, setFileError] = useState<string | null>(null)
  const [fileSuccess, setFileSuccess] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setFileError(null)
    setFileSuccess(null)

    if (!file) return

    if (!file.name.endsWith(".csv")) {
      setFileError("Le fichier doit être au format CSV")
      return
    }

    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const lines = text.split("\n")
        const headers = lines[0].split(",").map((h) => h.trim())

        const requiredColumns = ["region", "variable", "data"]
        const missing = requiredColumns.filter((col) => !headers.includes(col))
        if (missing.length > 0) {
          setFileError(`Colonnes manquantes : ${missing.join(", ")}`)
          return
        }

        const parsedData: CSVData[] = []
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim() === "") continue
          const values = lines[i].split(",").map((v) => v.trim())
          if (values.length !== headers.length) {
            setFileError(`Erreur à la ligne ${i + 1} : nombre de colonnes incorrect`)
            return
          }

          const row: CSVData = { region: "", variable: "", data: "" }
          headers.forEach((header, idx) => {
            row[header] = header === "data" && !isNaN(Number(values[idx])) ? Number(values[idx]) : values[idx]
          })

          parsedData.push(row)
        }

        setFileSuccess(`Fichier importé avec succès : ${parsedData.length} lignes`)
        onDataParsed(parsedData)
      } catch (error) {
        setFileError("Erreur lors de l’analyse du fichier")
        console.error(error)
      }
    }

    reader.onerror = () => {
      setFileError("Erreur de lecture du fichier")
    }

    reader.readAsText(file)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Importer des Données</CardTitle>
        <CardDescription>Importez un fichier CSV contenant les colonnes 'region', 'variable' et 'data'</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="flex flex-col h-[200px] items-center justify-center rounded-lg border border-dashed cursor-pointer"
          onClick={triggerFileInput}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".csv"
            onChange={handleFileUpload}
          />
          <div className="flex flex-col items-center gap-2 text-center p-4">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-medium">Importer un fichier CSV</h3>
            <p className="text-sm text-muted-foreground">
              Le fichier doit contenir les colonnes &apos;region&apos;, &apos;variable&apos; et &apos;data&apos;
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              Parcourir les fichiers
            </Button>
          </div>
        </div>

        {fileError && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{fileError}</AlertDescription>
          </Alert>
        )}

        {fileSuccess && (
          <Alert className="mt-4 bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-50">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Succès</AlertTitle>
            <AlertDescription>{fileSuccess}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
