import { Request, Response } from "express";
import { prisma } from "../database";

export default async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) return res.status(400).json("O id é obrigatorio");

    const getClientsById = await prisma.client.findFirst({
      where: {
        id: id,
      },
    });

    return res.status(200).json(getClientsById);
  } catch (error) {
    console.log(error);
  }
};
