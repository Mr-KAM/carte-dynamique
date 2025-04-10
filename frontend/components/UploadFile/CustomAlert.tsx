import { AlertCircle, CheckCircle2 } from "lucide-react";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface FileUploadAlertProps {
  fileError?: string | null;
  fileSuccess?: string | null;
}
export default function CustomAlert({
  fileError,
  fileSuccess,
}: FileUploadAlertProps) {
  return (
    <>
      {fileError && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{fileError}</AlertDescription>
        </Alert>
      )}

      {fileSuccess && (
        <Alert
          variant="default"
          className="mt-4 bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-50"
        >
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Succès</AlertTitle>
          <AlertDescription>{fileSuccess}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
