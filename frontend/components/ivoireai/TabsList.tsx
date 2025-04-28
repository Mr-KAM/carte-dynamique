import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsList() {
  return (
    <div className="border-b px-4">
      <TabsList className="h-12">
        {tabsList.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex items-center gap-2"
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}
