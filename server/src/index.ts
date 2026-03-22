import app from "./app.js";

const PORT = process.env.PORT ?? 3001;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.info(`🚀 Server running on http://localhost:${PORT}`);
  });
}

export default app;
