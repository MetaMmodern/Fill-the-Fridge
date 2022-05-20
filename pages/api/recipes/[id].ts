import type { NextApiRequest, NextApiResponse } from "next";
import { getArticle } from "../../../utils/articlesFromPage";

async function handler (req: NextApiRequest, res: NextApiResponse) {
  const article = await getArticle(
    `https://www.povarenok.ru/recipes/show/${req.query.id}`
  );
  return res.json(article);
}

export default handler;