import { Request, Response } from "express";
import { prisma } from "../database";
import existsOrNot from "../ultils/existsOrNot";

export default async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    existsOrNot(id, res);

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
