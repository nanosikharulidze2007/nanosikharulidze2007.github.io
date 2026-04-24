export const incrementLevel = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/game`, {
      method: "PUT",
    });
    if (!response.ok) throw new Error("Failed to fetch level");
    const data = await response.json();
  } catch (error) {
    console.error("Error fetching level:", error);
  }
};
