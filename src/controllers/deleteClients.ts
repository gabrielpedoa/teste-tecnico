import { Request, Response } from "express";
import { prisma } from "../database";
import existsOrNot from "../ultils/existsOrNot";

export default async (req: Request, res: Response) => {
  const id = req.params.id;

  existsOrNot(id, res)

  const deleteClients = await prisma.$transaction([
    prisma.adress.deleteMany({
      where: {
        clientId: id,
      },
    }),
    prisma.client.delete({
      where: {
        id: id,
      },
    }),
  ]);

  return res.status(200).json({ deleteClients });
};
