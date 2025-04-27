import { create } from "zustand";

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

type AIFunctionsStore = {
  messages: Message[];
  input: string;
  isLoading: boolean;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setInput: (input: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  handleSuggestedQuery: (query: string) => void;
  handleSendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
};

export const useAIFunctionsStore = create<AIFunctionsStore>((set, get) => ({
  messages: [
    {
      role: "assistant",
      content:
        "Bonjour, je suis Ivoire-AI votre assistant IA. Comment puis-je vous aider ?",
      timestamp: new Date(),
    },
  ],
  input: "",
  isLoading: false,

  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setInput: (input) => set({ input }),
  setIsLoading: (isLoading) => set({ isLoading }),

  handleSuggestedQuery: (query) => {
    set({ input: query });
  },

  handleSendMessage: () => {
    const { input, messages } = get();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    set({
      messages: [...messages, userMessage],
      input: "",
      isLoading: true,
    });
  },

  handleKeyDown: (e) => {
    const { handleSendMessage } = get();
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  },
}));
