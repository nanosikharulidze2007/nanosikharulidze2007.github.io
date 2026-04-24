export type Provider = "web" | "telegram" | "whatsapp" | "messenger";

export interface ChatMessage {
  id: string;
  conversationId: string;
  text: string;
  from: "visitor" | "agent";
  provider: Provider;
  name?: string;
  timestamp: number;
}
