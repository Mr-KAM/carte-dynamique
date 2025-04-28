import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useAIFunctionsStore } from "@/store/useAIFunctionsStore";

export default function SendQuestion() {
  const { input, setInput, handleKeyDown, isLoading, handleSendQuestion } =
    useAIFunctionsStore();

  return (
    <div className="p-4 border-t">
      <div className="flex gap-2">
        <Input
          placeholder="Posez une question sur ce que connais IvoireAI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="flex-1"
        />
        <Button
          onClick={handleSendQuestion}
          disabled={!input.trim() || isLoading}
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Envoyer</span>
        </Button>
      </div>
    </div>
  );
}
