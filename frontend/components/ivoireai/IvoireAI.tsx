"use client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import tabsList from "./tabsList";
import ListOfDBforAI from "./ListOfDBforAI";
import ListOfdocumentsforAI from "./ListOfdocumentsforAI";
import ChatWithAI from "./ChatWithAI";

export function IvoireAI() {
  return (
    <Card className="h-full w-full md:w-[70rem]">
      <Tabs defaultValue="chat" className="flex-1 flex flex-col">
        <div className="border-b px-4">
          <TabsList className="h-12">
            {tabsList.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <ChatWithAI />
        <ListOfDBforAI />
        <ListOfdocumentsforAI />
      </Tabs>
    </Card>
  );
}
