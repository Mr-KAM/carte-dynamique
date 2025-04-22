"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ministries = [
  {
    value: "education",
    label: "Ministère de l'Éducation Nationale et de l'Alphabétisation",
    acronyme: "MENA",
  },
  {
    value: "sante",
    label:
      "Ministère de la Santé, de l'Hygiène Publique et de la Couverture Maladie Universelle",
    acronyme: "MSHP-CMU",
  },
  {
    value: "agriculture",
    label:
      "Ministère de l'Agriculture, du Développement Rural et des Productions Vivrières",
    acronyme: "MINADER",
  },
  {
    value: "finance",
    label: "Ministère des Finances et du Budget",
    acronyme: "MFB",
  },
  {
    value: "infrastructure",
    label: "Ministère de l'Équipement et de l'Entretien Routier",
    acronyme: "MEER",
  },
  {
    value: "emploi",
    label: "Ministère de l'Emploi et de la Protection Sociale",
    acronyme: "MEPS",
  },
  {
    value: "culture",
    label: "Ministère de la Culture et de la Francophonie",
    acronyme: "MCF",
  },
  {
    value: "defense",
    label: "Ministère d'État, Ministère de la Défense",
    acronyme: "MDN",
  },
  {
    value: "justice",
    label: "Garde des Sceaux, Ministère de la Justice et des Droits de l'Homme",
    acronyme: "MJDH",
  },
  {
    value: "environnement",
    label:
      "Ministère de l'Environnement, du Développement Durable et de la Transition Écologique",
    acronyme: "MEDDTE",
  },
  {
    value: "enseignement_technique",
    label:
      "Ministère de l'Enseignement Technique, de la Formation Professionnelle et de l'Apprentissage",
    acronyme: "METFPA",
  },
  {
    value: "enseignement_superieur",
    label:
      "Ministère de l'Enseignement Supérieur et de la Recherche Scientifique",
    acronyme: "MESRS",
  },
  {
    value: "interieur",
    label: "Ministère de l'Intérieur et de la Sécurité",
    acronyme: "MIS",
  },
  {
    value: "plan",
    label: "Ministère de l'Économie, du Plan et du Développement",
    acronyme: "MEPD",
  },
  {
    value: "mines",
    label: "Ministère des Mines, du Pétrole et de l'Énergie",
    acronyme: "MMPE",
  },
  {
    value: "transports",
    label: "Ministère des Transports",
    acronyme: "MT",
  },
  {
    value: "budget",
    label: "Ministère du Budget et du Portefeuille de l'État",
    acronyme: "MBPE",
  },
  {
    value: "eaux_forets",
    label: "Ministère des Eaux et Forêts",
    acronyme: "MINEF",
  },
  {
    value: "commerce",
    label: "Ministère du Commerce et de l'Industrie",
    acronyme: "MCI",
  },
  {
    value: "jeunesse",
    label:
      "Ministère de la Promotion de la Jeunesse, de l'Insertion Professionnelle et du Service Civique",
    acronyme: "MPJIPSC",
  },
  {
    value: "sports",
    label: "Ministère des Sports et du Cadre de Vie",
    acronyme: "MSCV",
  },
  {
    value: "ressources_animales",
    label: "Ministère des Ressources Animales et Halieutiques",
    acronyme: "MIRAH",
  },
  {
    value: "communication",
    label: "Ministère de la Communication et de l'Économie Numérique",
    acronyme: "MICEN",
  },
  {
    value: "tourisme",
    label: "Ministère du Tourisme et des Loisirs",
    acronyme: "MTL",
  },
  {
    value: "hydraulique",
    label: "Ministère de l'Hydraulique, de l'Assainissement et de la Salubrité",
    acronyme: "MHAS",
  },
  {
    value: "gouvernance",
    label:
      "Ministère de la Promotion de la Bonne Gouvernance et de la Lutte contre la Corruption",
    acronyme: "MPBGLC",
  },
  {
    value: "solidarite",
    label:
      "Ministère de la Cohésion Nationale, de la Solidarité et de la Lutte contre la Pauvreté",
    acronyme: "MCNSLP",
  },
  {
    value: "femme",
    label: "Ministère de la Femme, de la Famille et de l'Enfant",
    acronyme: "MFFE",
  },
  {
    value: "affaires_etrangeres",
    label:
      "Ministère des Affaires Étrangères, de l'Intégration Africaine et des Ivoiriens de l'Extérieur",
    acronyme: "MAEIAIE",
  },
  {
    value: "fonction_publique",
    label:
      "Ministère d'État, Ministère de la Fonction Publique et de la Modernisation de l'Administration",
    acronyme: "MEFPMA",
  },
  {
    value: "construction",
    label: "Ministère de la Construction, du Logement et de l'Urbanisme",
    acronyme: "MCLU",
  },
  {
    value: "patrimoine",
    label:
      "Ministère du Patrimoine, du Portefeuille de l'État et des Entreprises Publiques",
    acronyme: "MPPEEP",
  },
  {
    value: "transition_numerique",
    label: "Ministère de la Transition Numérique et de la Digitalisation",
    acronyme: "MTND",
  },
];

export function MinistrySelector() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between md:w-[300px]"
        >
          <span className="truncate max-w-96 block">
            {value
              ? ministries.find((ministry) => ministry.value === value)?.label
              : "Sélectionner un ministère..."}
          </span>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 md:w-[300px]">
        <Command>
          <CommandInput placeholder="Rechercher un ministère..." />
          <CommandList>
            <CommandEmpty>Aucun ministère trouvé.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-auto">
              {ministries.map((ministry) => (
                <CommandItem
                  key={ministry.value}
                  value={ministry.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === ministry.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {ministry.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
