import { Request, Response } from "express";
import { prisma } from "../database";

export default async (req: Request, res: Response) => {

  
  const getClients = await prisma.client.findMany({});
  return res.status(200).json(getClients);
};
