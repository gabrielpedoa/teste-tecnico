import { Response } from "express";

export default (params: string, res: Response) => {
  if (!params) return res.status(400).json(`O ${params} é necessario`);
};
