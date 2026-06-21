import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";
import { IndexRoutes } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import { envVars } from "./app/config/env";
import qs from "qs"

const app: Application = express();

app.set("query parser", (str: string)=> qs.parse(str))

// 1. Security & CORS (Must be first to allow handshake)
app.use(cors({
  origin: [envVars.FRONTEND_URL, envVars.BETTER_AUTH_URL, "http://localhost:3000", "http://localhost:5000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 2. Body Parsers (Must come before routes to populate req.body)
app.use(express.json({ limit: '10mb' })); // Increased limit for potential image metadata
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// 3. View Engine (Setup for templates)
app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), `src/app/templates`));

// 4. Authentication Route
app.use("/api/auth", toNodeHandler(auth));

// 5. Application API Routes
app.use("/api/v1", IndexRoutes);

// 6. Health Check
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: '🏥 Hospital Management System API Server running smoothly...'
  });
});

// 7. Error Handling (Must be at the very bottom)
app.use(globalErrorHandler);
app.use(notFound);

export default app;