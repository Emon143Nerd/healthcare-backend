import express, { Application, Request, Response } from "express";
import cors from "cors";
import { IndexRoutes } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";
import path from "path";
import { envVars } from "./app/config/env";

const app: Application = express();
app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), `src/app/templates`) )

app.use(cors({
  origin:[envVars.FRONTEND_URL, envVars.BETTER_AUTH_URL, "http://localhost:3000", "http://localhost:5000"],
  credentials:true,
  methods:["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use("/api/auth", toNodeHandler(auth))

// 💡 NEW: Enable Cross-Origin Resource Sharing so your future React frontend can communicate with this API
app.use(cors());

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Main Application API Routing Setup
app.use("/api/v1", IndexRoutes);

// 💡 REFACTORED: Clean, standard health check route (bypassing database clutter)
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: '🏥 Hospital Management System API Server running smoothly...'
  });
});

// 🚨 CRITICAL: Global Error Interceptor Boundary Protection Layers
// These must sit at the absolute bottom, after all of your routes!
app.use(globalErrorHandler);
app.use(notFound);

export default app;