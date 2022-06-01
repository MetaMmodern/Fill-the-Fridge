import { NextApiHandler } from "next";
import getCart from "../../utils/getPrice";

const handler: NextApiHandler = async (req, res) => {
  const result = await getCart(req.body);
  res.status(200).json(result);
};

export default handler;
