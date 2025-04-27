import { Bot } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
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
  );
}
