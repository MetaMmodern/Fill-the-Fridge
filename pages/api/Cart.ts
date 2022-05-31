import { NextApiRequest, NextApiResponse } from "next";
import getCart from "../../utils/getPrice";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await getCart(req.body);
  res.status(200).json(result);
}
