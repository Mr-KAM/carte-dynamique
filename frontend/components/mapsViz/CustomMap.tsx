import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

export default function CustomMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personnalisation de la Carte</CardTitle>
        <CardDescription>Modifiez l'apparence de votre carte</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="map-title">Titre de la Carte</Label>
          <Input
            id="map-title"
            placeholder="Entrez le titre de la carte"
            defaultValue="Carte des centres EFTP"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="map-color">Palette de Couleurs</Label>
          <select
            id="map-color"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <optgroup label="Séquentielles">
              <option value="viridis">viridis</option>
              <option value="plasma">plasma</option>
              <option value="inferno">inferno</option>
              <option value="magma">magma</option>
              <option value="cividis">cividis</option>
              <option value="Blues">Blues</option>
              <option value="Greens">Greens</option>
              <option value="Reds">Reds</option>
              <option value="Oranges">Oranges</option>
              <option value="Purples">Purples</option>
              <option value="YlGn">YlGn</option>
              <option value="YlGnBu">YlGnBu</option>
              <option value="YlOrBr">YlOrBr</option>
              <option value="YlOrRd">YlOrRd</option>
              <option value="BuGn">BuGn</option>
              <option value="BuPu">BuPu</option>
              <option value="GnBu">GnBu</option>
              <option value="OrRd">OrRd</option>
              <option value="PuBu">PuBu</option>
              <option value="PuBuGn">PuBuGn</option>
              <option value="PuRd">PuRd</option>
            </optgroup>
            <optgroup label="Divergentes">
              <option value="BrBG">BrBG</option>
              <option value="PRGn">PRGn</option>
              <option value="PiYG">PiYG</option>
              <option value="PuOr">PuOr</option>
              <option value="RdBu">RdBu</option>
              <option value="RdGy">RdGy</option>
              <option value="RdYlBu">RdYlBu</option>
              <option value="RdYlGn">RdYlGn</option>
              <option value="Spectral">Spectral</option>
              <option value="coolwarm">coolwarm</option>
              <option value="seismic">seismic</option>
            </optgroup>
            <optgroup label="Qualitatives">
              <option value="Accent">Accent</option>
              <option value="Dark2">Dark2</option>
              <option value="Paired">Paired</option>
              <option value="Pastel1">Pastel1</option>
              <option value="Pastel2">Pastel2</option>
              <option value="Set1">Set1</option>
              <option value="Set2">Set2</option>
              <option value="Set3">Set3</option>
              <option value="tab10">tab10</option>
              <option value="tab20">tab20</option>
              <option value="tab20b">tab20b</option>
              <option value="tab20c">tab20c</option>
            </optgroup>
            <optgroup label="Cycliques">
              <option value="twilight">twilight</option>
              <option value="twilight_shifted">twilight_shifted</option>
              <option value="hsv">hsv</option>
            </optgroup>
            <optgroup label="Perceptuellement Uniformes">
              <option value="turbo">turbo</option>
              <option value="rainbow">rainbow</option>
              <option value="jet">jet</option>
            </optgroup>
            <optgroup label="Autres">
              <option value="cubehelix">cubehelix</option>
              <option value="gist_earth">gist_earth</option>
              <option value="gist_heat">gist_heat</option>
              <option value="gist_ncar">gist_ncar</option>
              <option value="gist_rainbow">gist_rainbow</option>
              <option value="gist_stern">gist_stern</option>
              <option value="autumn">autumn</option>
              <option value="winter">winter</option>
              <option value="summer">summer</option>
              <option value="spring">spring</option>
              <option value="cool">cool</option>
              <option value="hot">hot</option>
              <option value="copper">copper</option>
              <option value="bone">bone</option>
              <option value="gray">gray</option>
              <option value="terrain">terrain</option>
              <option value="ocean">ocean</option>
              <option value="flag">flag</option>
              <option value="prism">prism</option>
              <option value="nipy_spectral">nipy_spectral</option>
              <option value="gnuplot">gnuplot</option>
              <option value="gnuplot2">gnuplot2</option>
              <option value="brg">brg</option>
              <option value="bwr">bwr</option>
              <option value="berlin">berlin</option>
              <option value="managua">managua</option>
              <option value="vanimo">vanimo</option>
            </optgroup>
          </select>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-full h-6 rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"></div>
            <span className="text-xs text-muted-foreground">
              Aperçu de la palette
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="map-legend">Légende</Label>
          <textarea
            id="map-legend"
            placeholder="Entrez la légende de la carte"
            defaultValue="● Centres de formation actifs&#10;● Centres en construction&#10;● Centres partenaires"
            className="min-h-[80px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}
