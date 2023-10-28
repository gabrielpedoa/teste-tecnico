import { Router } from "express";
import postClients from "../controllers/postClients";
import getClients from "../controllers/getClients";
import getClientsById from "../controllers/getClientsById";
import deleteClients from "../controllers/deleteClients";

const router = Router();

export default () => {
  router.post("/clientes", postClients);
  router.get("/clientes", getClients);
  router.get("/clientes/:id", getClientsById);
  router.delete("/clientes/:id", deleteClients);

  return router;
};
