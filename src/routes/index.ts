import { Router } from "express";
import postClients from "../controllers/postClients";

const router = Router();

export default () => {
  router.post("/clientes", postClients);

  return router;
};
