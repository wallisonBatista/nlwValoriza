import "reflect-metadata";
import express from "express";
import "./database";
import { router } from "./routes";

const app = express();

//habilitando para trabalhar com json
app.use(express.json());

app.use(router);
//inicializar o servidor
app.listen(3000, () => console.log("server is running nlw"));
