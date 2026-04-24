import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiMessageCircle, FiSend, FiX, FiImage } from "react-icons/fi";
import "./chat.css";

type ChatMessage = {
  id: string;
  conversationId: string;
  text: string;
  from: "visitor" | "agent";
  provider: "web" | "telegram" | "whatsapp" | "messenger";
  name?: string;
  timestamp: number;
};

const WS_URL =
  (import.meta.env.VITE_WS_URL as string) || "ws://localhost:8080/ws";
const API_BASE =
  (import.meta.env.VITE_API_BASE as string) || "http://localhost:8080";

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string>(
    () => localStorage.getItem("conversationId") || ""
  );
  const [name, setName] = useState<string>(
    () => localStorage.getItem("name") || "Visitor"
  );

  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoCaption, setPhotoCaption] = useState("");

  const wsRef = useRef<WebSocket | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const wsUrl = useMemo(() => {
    const url = new URL(WS_URL);
    url.searchParams.set("conversation_id", conversationId);
    url.searchParams.set("name", name);
    return url.toString();
  }, [conversationId, name]);

  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  // WebSocket connect
  useEffect(() => {
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.addEventListener("open", () => setConnected(true));
    ws.addEventListener("close", () => setConnected(false));
    ws.addEventListener("message", (ev) => {
      try {
        const data = JSON.parse(ev.data);
        if (data.type === "hello") {
          const id = data.payload?.conversationId;
          if (id) {
            setConversationId((prev) => {
              if (!prev) localStorage.setItem("conversationId", id);
              return prev || id;
            });
          }
          return;
        }
        if (data.type === "message" && data.payload) {
          setMessages((prev) => [...prev, data.payload as ChatMessage]);
        }
      } catch {}
    });

    return () => ws.close();
  }, [wsUrl]);

  // Fetch history
  useEffect(() => {
    if (!conversationId) return;
    let aborted = false;
    (async () => {
      try {
        const r = await fetch(
          `${API_BASE}/api/messages?conversationId=${conversationId}&limit=200`
        );
        const j = await r.json();
        if (!aborted && Array.isArray(j.items)) setMessages(j.items);
      } catch {}
    })();
    return () => {
      aborted = true;
    };
  }, [conversationId]);

  // Auto-scroll
  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, open]);

  const sendText = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    const text = input.trim();
    if (!text) return;
    wsRef.current.send(JSON.stringify({ type: "send", text }));
    setInput("");
  };

  const sendPhoto = async () => {
    if (!photo || !conversationId) return;
    const form = new FormData();
    form.append("photo", photo);
    form.append("conversationId", conversationId);
    form.append("name", name);
    if (photoCaption.trim()) form.append("caption", photoCaption.trim());

    try {
      const res = await fetch(`${API_BASE}/api/send-photo`, {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error("send-photo failed");
      setPhoto(null);
      setPhotoCaption("");
      const inputEl = document.getElementById(
        "ocw-photo-input"
      ) as HTMLInputElement | null;
      if (inputEl) inputEl.value = "";
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {/* Floating Toggle Button (scoped class) */}
      <button
        aria-label="Open chat"
        onClick={() => setOpen((v) => !v)}
        className="ocw-toggle-btn"
      >
        {open ? <FiX size={22} /> : <FiMessageCircle size={24} />}
      </button>

      {/* Popup */}
      {open && (
        <div className=" ocw-popup">
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className="ocw-header"
          >
            <FiMessageCircle size={18} />
            {/* <strong className="ocw-header-title">Chat with us</strong> */}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="ocw-name"
            />
            <span
              className={`ocw-badge ${
                connected ? "ocw-online" : "ocw-offline"
              }`}
            >
              {connected ? "online" : "offline"}
            </span>
            {/* <span className="ocw-badge">
                {conversationId ? `id: ${conversationId.slice(0, 8)}` : "new"}
              </span> */}
          </div>

          {/* Messages */}
          <div ref={listRef} className="ocw-messages">
            {messages.map((m) => (
              <div key={m.id} className={`ocw-row ${m.from}`}>
                <div className={`ocw-bubble ${m.from}`}>
                  <div className="ocw-meta">
                    {new Date(m.timestamp).toLocaleTimeString()} • {m.from} via{" "}
                    {m.provider}
                  </div>
                  <div>{m.text}</div>
                </div>
              </div>
            ))}
            {!messages.length && (
              <div className="ocw-empty">No messages yet — say hi! 👋</div>
            )}
          </div>

          {/* Composer */}
          <div className="ocw-composer">
            <div className="ocw-rowline">
              <input
                placeholder="Type a message…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendText()}
                className="ocw-input"
              />
              <button
                onClick={sendText}
                disabled={!connected}
                className="ocw-send"
              >
                <FiSend size={16} /> <span>Send</span>
              </button>
            </div>

            <div className="ocw-rowline ocw-photo-line">
              <label htmlFor="ocw-photo-input" className="ocw-choose">
                <FiImage size={16} />
                <span
                  style={{
                    overflow: "hidden",
                  }}
                >
                  <p
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {photo ? "Photo is Chosen" : "Choose photo"}
                  </p>
                </span>
              </label>
              <input
                id="ocw-photo-input"
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                className="ocw-hidden-file"
              />
              {/* <input
                placeholder="Caption (optional)…"
                value={photoCaption}
                onChange={(e) => setPhotoCaption(e.target.value)}
                className="ocw-input"
              /> */}
              <button
                onClick={sendPhoto}
                disabled={!photo}
                className="ocw-send"
                data-variant={photo ? "active" : "disabled"}
              >
                <FiSend size={16} /> <span>Send Photo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
