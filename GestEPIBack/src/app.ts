//********** Imports **********//
import express from "express";
import cors from "cors";
import * as middlewares from "./middlewares";
import routes from "./routes";

require("dotenv").config();

//********** Server **********//
const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"]
}));
app.use(express.json());

// Routes - CECI DOIT ÊTRE AVANT LES MIDDLEWARES D'ERREUR
app.use('/api', routes);

// Route de base pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.json({ message: 'API GestEPI fonctionne correctement' });
});

// Middlewares d'erreur - DOIVENT ÊTRE APRÈS LES ROUTES
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
