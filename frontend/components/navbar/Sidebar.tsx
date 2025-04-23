"use client";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "../ui/sidebar";
import {
  BarChart3,
  Bot,
  ChartNoAxesCombined,
  FileUp,
  Globe,
  HelpCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  {
    id: "BarChart3",
    title: "Tableau de Bord",
    icon: BarChart3,
    path: "/statistiques",
  },
  {
    id: "FileUp",
    title: "Importer des Données",
    icon: FileUp,
    path: "/importer",
  },
  {
    id: "Globe",
    title: "Visualisation Carte",
    icon: Globe,
    path: "/map",
  },
  {
    id: "AI",
    title: "Ivoire AI",
    icon: Bot,
    path: "/ivoireai",
  },
  {
    id: "HelpCircle",
    title: "À Propos",
    icon: HelpCircle,
    path: "/about",
  },
];

export default function AppSidebar() {
  const pathname = usePathname();
  return (
    <SidebarProvider>
      <Sidebar>
        {/* TODO: Ajouter un lien qui mène vers la page d'accueil en cliquant sur le logo*/}
        <SidebarHeader className="cursor-pointer">
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href={"/"}>
                <SidebarMenuButton size="lg" asChild>
                  <div className="flex items-center">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <ChartNoAxesCombined className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none ml-2">
                      <span className="font-semibold">StatViz CI 🇨🇮</span>
                      {/* TODO: Rendre le nom dynamique en fonction du ministère sélectionnée*/}
                      <span className="text-xs font-medium text-muted-foreground">
                        METFPA
                      </span>
                    </div>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="mt-5">
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <Link href={item.path} passHref>
                      <SidebarMenuButton
                        className={`cursor-pointer ${
                          pathname === item.path
                            ? "font-bold bg-primary text-secondary hover:bg-primary hover:text-secondary"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground font-medium"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="mr-2 size-4" />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
