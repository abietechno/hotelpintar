import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- MOCK API ROUTES ---

  // Dashboard Stats
  app.get("/api/stats", (req, res) => {
    res.json({
      occupancyRate: 82,
      revenue: 145000000,
      bookings: 145,
      activeRooms: 120,
      revenueTrends: [
        { name: "Mon", revenue: 15 },
        { name: "Tue", revenue: 12 },
        { name: "Wed", revenue: 18 },
        { name: "Thu", revenue: 20 },
        { name: "Fri", revenue: 32 },
        { name: "Sat", revenue: 45 },
        { name: "Sun", revenue: 35 },
      ]
    });
  });

  // OTA Config Endpoints
  app.get("/api/ota-integrations", (req, res) => {
    res.json({
      integrations: [
        { id: "traveloka", name: "Traveloka", active: true },
        { id: "agoda", name: "Agoda", active: true },
        { id: "booking", name: "Booking.com", active: false }
      ]
    });
  });

  app.post("/api/ota-integrations/config", (req, res) => {
    res.json({ success: true, message: "Configuration updated successfully" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
