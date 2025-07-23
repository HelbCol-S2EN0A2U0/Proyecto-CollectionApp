import dotenv from "dotenv";
import express from "express"; // importamos el pqte express
import cors from "cors";
import bodyParser from "body-parser";
// 2 .
import mongoose from "mongoose";
import connectDB from "./db.js";

// 3.
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import swaggerUI from "swagger-ui-express";
import swaggerJSDOC from "swagger-jsdoc";
const swaggerConfig = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CollectionApp Node Mongo",
      servers: [{ url: "http://localhost:5000" }],
    },
  },
  apis: [`${path.join(__dirname, "./Routes/*.js")}`],
};

import markRoutes from "./Routes/markRoutes.js";
// import userRoutes from "./routes/users.js"; // importamos el archivo donde manejamos las routes del App>
// import categoryRoutes from "./routes/categoryRoutes.js";
// import modelRoutes from "./routes/modelRoutes.js";

dotenv.config();

const app = express(); //Ejecutamos express y le asignamos a la variable app
//middleware para convertir de json a objetos javascript
app.use(express.json());
const port = process.env.PORT || 9000; //Indicamos que escuche por el puerto indicado,
//sino hay ninguno que use el 5000

// Middleware para manejar datos URL-encoded del formularios (x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

var corsOptions = {
  origin: "*",
  method: "GET, POST, OPTIONS, PUT, DELETE",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// // middelware para incorporar como prefijo la silaba "/api" a cada endpoint
app.use("/api", markRoutes);
// app.use("/api", userRoutes);
// app.use("/api", categoryRoutes);
// app.use("/api", modelRoutes);

// Expone la carpeta "uploads" como pública en /uploads
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// 3. Para la documentacion de la API
app.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJSDOC(swaggerConfig))
);

// 2.
connectDB();

// 1. Ruta base del APIWEB, nuestro endpoint base
app.get("/", (req, res) => {
  res.send("<h1>Bienvenido a  COLLECTIONAPP v 1.0</h1>");
});

app.listen(port, () => {
  console.log(`Se inicio el servidor, y esta escuchando por el puerto ${port}`);
});
