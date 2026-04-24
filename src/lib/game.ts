// Simple client for the Game Level API
const API_BASE =
  (import.meta.env.VITE_API_BASE as string) || "http://localhost:8080";

export async function getLevel(): Promise<number> {
  const res = await fetch(`${API_BASE}/api/game`, { method: "GET" });
  if (!res.ok) throw new Error("Failed to fetch level");
  const data = await res.json();
  return data.level as number;
}

export async function incrementLevel(): Promise<number> {
  const res = await fetch(`${API_BASE}/api/game`, { method: "PUT" });
  if (!res.ok) throw new Error("Failed to increment level");
  const data = await res.json();
  return data.level as number;
}
