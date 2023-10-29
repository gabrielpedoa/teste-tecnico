import { Request, Response } from "express";
import existsOrNot from "../ultils/existsOrNot";
import { prisma } from "../database";
import { ClientProps } from "./postClients";

export default async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, email, phone, cep, state, city, neighborhood, street } =
    req.body as ClientProps;

  existsOrNot(id, res);

  const selectClientToUpdate = await prisma.$transaction([
    prisma.adress.findFirst({
      where: {
        clientId: id,
      },
    }),
    prisma.client.findFirst({
      where: {
        id: id,
      },
    }),
  ]);

  if (!selectClientToUpdate[0] || !selectClientToUpdate[1])
    return res.status(400).json(`Cliente não localizado`);

  const updateClient = await prisma.$transaction([
    prisma.client.update({
      where: {
        id: id,
      },
      data: {
        name,
        email,
        phone,
      },
    }),
    prisma.adress.update({
      where: {
        clientId: id,
      },
      data: {
        cep,
        state,
        city,
        neighborhood,
        street,
      },
    }),
  ]);

  return res.status(200).json({ updateClient });
};
