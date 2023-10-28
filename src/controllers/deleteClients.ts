import { Request, Response } from "express";
import { prisma } from "../database";

export default async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) return res.status(400).json("O id é obrigatorio");

  const deleteClients = await prisma.client.delete({
    where: {
      id: id,
    },
  });

  return res.status(200).json(deleteClients)
};
