import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "./sidebar";
import {
  BarChart3,
  Earth,
  FileUp,
  Globe,
  HelpCircle,
  Settings,
} from "lucide-react";

const navItems = [
  {
    id: "BarChart3",
    title: "Tableau de Bord",
    icon: BarChart3,
  },
  {
    id: "FileUp",
    title: "Importer des Données",
    icon: FileUp,
  },
  {
    id: "Globe",
    title: "Visualisation Carte",
    icon: Globe,
  },
  {
    id: "HelpCircle",
    title: "À Propos",
    icon: HelpCircle,
  },
];

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <div className="flex items-center">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Earth className="size-4 border-red-500" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none ml-2">
                    <span className="font-semibold">Carte Dynamique 🇨🇮</span>
                    <span className="text-xs">des indicateurs de l'EFTP</span>
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="mt-5">
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <item.icon className="mr-2 size-4" />
                        <span>{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <div className="flex items-center">
                  <Settings className="mr-2 size-4" />
                  <span>Paramètres</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
