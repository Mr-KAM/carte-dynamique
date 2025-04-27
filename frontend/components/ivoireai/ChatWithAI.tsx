import { useEffect, useRef, useState } from "react";
import { TabsContent } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Bot, Sparkles, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import suggestedQueries from "./suggestedQueries";
import Loading from "./Loading";
import SendQuestion from "./SendQuestion";
import { useAIFunctionsStore } from "@/store/useAIFunctionsStore";

export default function ChatWithAI() {
  const { isLoading, messages, handleSuggestedQuery } = useAIFunctionsStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start gap-3 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                } rounded-lg p-3`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {message.role === "user" ? (
                    <div className="h-8 w-8 rounded-full bg-primary-foreground flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="whitespace-pre-line">{message.content}</div>
                  <div
                    className={`text-xs mt-1 ${
                      message.role === "user"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && <Loading />}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {messages.length === 1 && (
        <div className="px-4 pb-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Questions suggérées
              </CardTitle>
              <CardDescription>
                Cliquez sur une suggestion ou posez votre propre question
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedQueries.map((query, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto py-2 px-3 text-left"
                  onClick={() => handleSuggestedQuery(query)}
                >
                  {query}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
      <SendQuestion />
    </TabsContent>
  );
}
