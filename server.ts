import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contacts
  app.post("/api/contact", (req, res) => {
    const { name, email, message, product } = req.body;
    console.log("Nuovo messaggio ricevuto:", { name, email, message, product });
    
    // In a real scenario, here we would send an email or save to DB
    res.status(200).json({ 
      success: true, 
      message: "Messaggio inviato correttamente! Ti risponderemo a breve." 
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
