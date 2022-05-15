import { NextApiRequest } from "next";
import getCart from '../../utils/getPrice';

export default async function handler(req: NextApiRequest) {
  return await getCart(req.body);
}
