import { Request, Response } from "express";
import { prisma } from "../database";
import existsOrNot from "../ultils/existsOrNot";

interface ClientProps {
  name: string;
  email: string;
  phone: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}

export default async (req: Request, res: Response) => {
  try {
    /*esse novo usuario, ja existe no banco?*/
    const { name, email, phone, cep, state, city, neighborhood, street } =
      req.body as ClientProps;
    /* verificação se existe no body a request, se não tiver no body (postman) ele vai acusar. */
    existsOrNot(name, "name");
    existsOrNot(email, "email");
    existsOrNot(phone, "phone");
    existsOrNot(cep, "cep");
    existsOrNot(state, "state");
    existsOrNot(city, "city");
    existsOrNot(neighborhood, "neighborhood");
    existsOrNot(street, "street");

    const verifyEmailAlreadyUsed = await prisma.client.findFirst({
      where: {
        email,
      },
    });

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
              cep,
              state,
              city,
              neighborhood,
              street,
            },
          },
        },
      });

      res.status(201).json({ insertClient });
      console.log("usuario criado com sucesso");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("erro");
  }
};
