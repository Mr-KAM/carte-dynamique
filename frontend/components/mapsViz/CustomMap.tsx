"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { colorPalette } from "@/utils/colorPalette";
import { useCustomMapStore } from "@/store/useCustomMapStore";

// 🎨 Fonction palette
const getColorPalette = (name: string) =>
  colorPalette[name] ?? "from-gray-300 to-gray-600";

export default function CustomMap() {
  const {
    title,
    selectedPalette,
    legend,
    setTitle,
    setSelectedPalette,
    setLegend,
  } = useCustomMapStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personnalisation de la Carte</CardTitle>
        <CardDescription>Modifiez l'apparence de votre carte</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Titre */}
        <div className="space-y-2">
          <Label htmlFor="map-title">Titre de la Carte</Label>
          <Input
            id="map-title"
            placeholder="Entrez le titre de la carte"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Palette */}
        <div className="space-y-2">
          <Label htmlFor="map-color">Palette de Couleurs</Label>
          <select
            id="map-color"
            value={selectedPalette}
            onChange={(e) => setSelectedPalette(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {Object.keys(colorPalette).map((palette) => (
              <option key={palette} value={palette}>
                {palette}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2 mt-2">
            <div
              className={`w-full h-6 rounded-md bg-gradient-to-r ${getColorPalette(
                selectedPalette
              )}`}
            ></div>
            <span className="text-xs text-muted-foreground">Aperçu</span>
          </div>
        </div>

        {/* Légende */}
        <div className="space-y-2">
          <Label htmlFor="map-legend">Légende</Label>
          <textarea
            id="map-legend"
            placeholder="Entrez la légende de la carte"
            value={legend}
            onChange={(e) => setLegend(e.target.value)}
            className="min-h-[80px] w-full border rounded-md p-2 text-sm"
          />
        </div>
      </CardContent>
    </Card>
  );
}
