import { Request, Response } from "express";
import { prisma } from "../database";

export default async (req: Request, res: Response) => {
  const { take = 10, skip = 0, name } = req.query;
  const getClients = await prisma.client.findMany({
    where: {
      name: {
        contains: name as string,
        mode: 'insensitive'
      },
    },
    skip: Number(skip),
    take: Number(take),
  });

  return res.status(200).json(getClients);
};
