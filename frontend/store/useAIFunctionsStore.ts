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
  setMessages: (
    messages: Message[] | ((prevMessages: Message[]) => Message[])
  ) => void;
  addMessage: (message: Message) => void;
  setInput: (input: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  handleSuggestedQuery: (query: string) => void;
  handleSendQuestion: () => void;
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

  setMessages: (messagesOrUpdater) =>
    set((state) => ({
      messages:
        typeof messagesOrUpdater === "function"
          ? messagesOrUpdater(state.messages)
          : messagesOrUpdater,
    })),

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setInput: (input) => set({ input }),
  setIsLoading: (isLoading) => set({ isLoading }),

  handleSuggestedQuery: (query) => {
    set({ input: query });
  },

  handleSendQuestion: async () => {
    const { input, messages, addMessage, setMessages, setInput, setIsLoading } =
      get();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage: Message = {
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };

      addMessage(assistantMessage);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });

          setMessages((currentMessages) => {
            const updatedMessages = [...currentMessages];
            updatedMessages[updatedMessages.length - 1].content += chunk;
            return updatedMessages;
          });
        }
      }
    } catch (error) {
      console.error("Erreur lors du streaming du message :", error);
    } finally {
      setIsLoading(false);
    }
  },

  handleKeyDown: (e) => {
    const { handleSendQuestion } = get();
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendQuestion();
    }
  },
}));
