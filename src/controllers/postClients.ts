import { Request, Response, response } from "express";
import { prisma } from "../database";
import existsInReqBody from "../ultils/existsInReqBody";
import { Api } from "../Api/cep";
import { json } from "stream/consumers";

export interface ClientProps {
  name: string;
  email: string;
  phone: string;
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}

export default async (req: Request, res: Response) => {
  try {
    /*esse novo usuario, ja existe no banco?*/
    const { name, email, phone, cep } = req.body as ClientProps;
    /* verificação se existe no body a request, se não tiver no body (postman) ele vai acusar. */
    existsInReqBody(name, "name");
    existsInReqBody(email, "email");
    existsInReqBody(phone, "phone");
    if (!cep) return res.status(400).json("o cep é obrigatório");

    const verifyEmailAlreadyUsed = await prisma.client.findFirst({
      where: {
        email,
      },
    });

    const response = await Api.get(`/${cep}/json`);
    if (response.status === 200) {
      const { logradouro, bairro, localidade, uf } = await response.data as ClientProps;

      if (verifyEmailAlreadyUsed) {
        return res.status(400).json("o email está sendo usado");
      } else {
        const insertClient = await prisma.client.create({
          data: {
            name,
            email,
            phone,
            Adress: {
              create: {
                cep: cep,
                city: localidade,
                neighborhood: bairro,
                state: uf,
                street: logradouro,
              },
            },
          },
        });
        res.status(201).json({ insertClient });
        console.log("usuario criado com sucesso");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("erro");
  }
};
