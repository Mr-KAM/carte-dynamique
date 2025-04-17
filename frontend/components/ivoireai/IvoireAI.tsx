"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Database, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function IvoireAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Bonjour, je suis votre assistant IA pour les données EFTP. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Exemples de requêtes suggérées
  const suggestedQueries = [
    "Combien d'apprenants sont inscrits dans la région d'Abidjan ?",
    "Montre-moi la répartition des centres par région",
    "Quelles sont les tendances d'inscription sur les 6 derniers mois ?",
    "Génère un rapport sur les taux de réussite par filière",
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simuler une réponse de l'IA après un court délai
    setTimeout(() => {
      let response = "";

      if (input.toLowerCase().includes("abidjan")) {
        response =
          "D'après nos données, il y a actuellement 4,800 apprenants inscrits dans la région d'Abidjan, répartis dans 32 centres de formation.";
      } else if (
        input.toLowerCase().includes("répartition") ||
        input.toLowerCase().includes("centres")
      ) {
        response =
          "Voici la répartition des centres par région :\n- Abidjan: 32 centres\n- Bouaké: 18 centres\n- Yamoussoukro: 12 centres\n- Korhogo: 8 centres\n- San Pedro: 6 centres\n- Autres régions: 11 centres";
      } else if (
        input.toLowerCase().includes("tendance") ||
        input.toLowerCase().includes("inscription")
      ) {
        response =
          "Sur les 6 derniers mois, nous observons une augmentation constante des inscriptions de 3.5% en moyenne par mois. La filière Informatique a connu la plus forte croissance (+5.2%), suivie par l'Électrotechnique (+4.1%).";
      } else if (
        input.toLowerCase().includes("rapport") ||
        input.toLowerCase().includes("taux de réussite")
      ) {
        response =
          "J'ai généré un rapport sur les taux de réussite par filière. Les résultats montrent que la filière Mécanique Automobile a le taux le plus élevé (92%), suivie par l'Informatique (88%) et la Construction (85%).";
      } else {
        response =
          'Je comprends votre question sur "' +
          input +
          "\". Pour y répondre précisément, j'aurais besoin d'analyser plus de données. Pourriez-vous préciser votre demande ou importer des données supplémentaires ?";
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuery = (query: string) => {
    setInput(query);
  };

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="chat" className="flex-1 flex flex-col">
        <div className="border-b px-4">
          <TabsList className="h-12">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>Données</span>
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Documents</span>
            </TabsTrigger>
          </TabsList>
        </div>

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
                      <div className="whitespace-pre-line">
                        {message.content}
                      </div>
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
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3 max-w-[80%] bg-muted rounded-lg p-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
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

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Posez une question sur vos données..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Envoyer</span>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="data"
          className="flex-1 flex flex-col items-center justify-center p-4 m-0"
        >
          <div className="text-center max-w-md">
            <Database className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">
              Sources de données connectées
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              L'assistant IA est connecté aux bases de données suivantes :
            </p>
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 p-2 border rounded-md">
                <Database className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Base EFTP Principale</p>
                  <p className="text-xs text-muted-foreground">
                    12 tables, dernière mise à jour: 02/04/2025
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 border rounded-md">
                <Database className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Statistiques Régionales</p>
                  <p className="text-xs text-muted-foreground">
                    5 tables, dernière mise à jour: 28/03/2025
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 border rounded-md">
                <Database className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Données Géographiques</p>
                  <p className="text-xs text-muted-foreground">
                    3 tables, dernière mise à jour: 15/03/2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="docs"
          className="flex-1 flex flex-col items-center justify-center p-4 m-0"
        >
          <div className="text-center max-w-md">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Documents intégrés</h3>
            <p className="text-sm text-muted-foreground mb-4">
              L'assistant IA a accès aux documents suivants pour répondre à vos
              questions :
            </p>
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 p-2 border rounded-md">
                <FileText className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">
                    Rapport Annuel EFTP 2024
                  </p>
                  <p className="text-xs text-muted-foreground">PDF, 48 pages</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 border rounded-md">
                <FileText className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Guide des Formations</p>
                  <p className="text-xs text-muted-foreground">
                    PDF, 124 pages
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 border rounded-md">
                <FileText className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Statistiques par Région</p>
                  <p className="text-xs text-muted-foreground">
                    Excel, 15 feuilles
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 border rounded-md">
                <FileText className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">
                    Normes et Standards EFTP
                  </p>
                  <p className="text-xs text-muted-foreground">PDF, 36 pages</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
