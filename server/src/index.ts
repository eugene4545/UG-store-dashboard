import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dashboardRoutes from "./routes/dashboardRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import { PrismaClient } from "@prisma/client";

/* ROUTE IMPORTS*/

/* CONFIGURATIONS */
dotenv.config();
const app = express();
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:45701@localhost:5432/inventorymangement?schema=public";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL, 
    },
  },
});

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/dashboard", dashboardRoutes); // http://localhost:8000/dashboard
app.use("/products", productRoutes);  // http://localhost:8000/products
app.use("/users", userRoutes);  // http://localhost:8000/users
app.use("/expenses", expenseRoutes);  // http://localhost:8000/expenses

/* SERVER */
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/* *ROOT ROUTE* */
app.get("/", (req, res) => {
  res.send("Server is running!");
});

/* TEMP SEED ROUTE — remove after use */
app.get("/run-seed", async (req, res) => {
  try {
    const fs = await import("fs");
    const path = await import("path");

    const dataDirectory = path.join(process.cwd(), "prisma", "seedData");
    const orderedFileNames = [
      "products.json","expenseSummary.json","sales.json","salesSummary.json",
      "purchases.json","purchaseSummary.json","users.json","expenses.json","expenseByCategory.json",
    ];

    // clear
    for (const fileName of [...orderedFileNames].reverse()) {
      const modelName = path.basename(fileName, ".json");
      const model: any = (prisma as any)[modelName];
      if (model) await model.deleteMany({});
    }

    // seed
    for (const fileName of orderedFileNames) {
      const filePath = path.join(dataDirectory, fileName);
      const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const modelName = path.basename(fileName, ".json");
      const model: any = (prisma as any)[modelName];
      if (!model) continue;
      for (const data of jsonData) await model.create({ data });
    }

    res.json({ success: true, message: "Database seeded successfully!" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});


console.log("Environment Variables Loaded:");
console.log("DATABASE_URL:", process.env.DATABASE_URL);

