import { Request, Response } from "express";
import existsOrNot from "../ultils/existsOrNot";
import { prisma } from "../database";
import { ClientProps } from "./postClients";
import { Api } from "../Api/cep";

// [TODO] se o usuario não existir no banco lançar um erro x
// [TODO] se o email do body for diferente do banco de dados, verificar se o novo email já esstá sendo usado x
// [TODO] refatorar o codigo dividindo-o em resposabilidades unicas
// [TODO] se o for um novo cep verificar se o cep existe na api

export default async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, email, phone, cep } = req.body as ClientProps;
  let address: any = null;
  existsOrNot(id, res);

  const client = await prisma.client.findFirst({
    where: {
      id: id,
    },
    select: {
      Adress: true,
      email: true,
    },
  });

  if (!client) return res.status(400).json("Usuario não existe");
  if (client.email !== email) {
    const verifyEmailAlreadyused = await prisma.client.findFirst({
      where: {
        email,
      },
    });
    if (verifyEmailAlreadyused)
      return res.status(400).json("o email já está sendo usado");
  }

  if (client.Adress?.cep !== cep) {
    const isCepValid = await Api.get(`${cep}/json`);
    if (isCepValid.status !== 200)
      return res.status(400).json("endereço invalido!");
      address = isCepValid.data;
  }
  client.Adress = address
    ? {
        id_adress: client.Adress?.id_adress!,
        clientId: client.Adress?.clientId!,
        cep: address.cep,
        city: address.localidade,
        neighborhood: address.bairro,
        state: address.uf,
        street: address.logradouro,
      }
    : client.Adress!;
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
      data: client.Adress,
    }),
  ]);

  return res.status(200).json({ updateClient });
};
