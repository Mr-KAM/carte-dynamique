"use client";
import Link from "next/link";
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
  SidebarTrigger,
} from "./sidebar";
import {
  BarChart3,
  Earth,
  FileUp,
  Globe,
  HelpCircle,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  {
    id: "BarChart3",
    title: "Tableau de Bord",
    icon: BarChart3,
    path: "/",
  },
  {
    id: "FileUp",
    title: "Importer des Données",
    icon: FileUp,
    path: "/fichier",
  },
  {
    id: "Globe",
    title: "Visualisation Carte",
    icon: Globe,
    path: "/map",
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
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <div className="flex items-center">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Earth className="size-4 border-red-500" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none ml-2">
                    <span className="font-semibold">Carte Dynamique</span>
                    <span className="text-xs">des données de l'EFTP 🇨🇮</span>
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
                    <Link href={item.path} passHref>
                      <SidebarMenuButton
                        className={`cursor-pointer ${
                          pathname === item.path ? "bg-slate-100 font-bold" : ""
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
      {/* <SidebarTrigger /> */}
    </SidebarProvider>
  );
}
