import { Globe, Link } from "lucide-react";

export default function logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold">
      <Globe className="h-6 w-6" />
      <span>StatViz CI</span>
    </Link>
  );
}
