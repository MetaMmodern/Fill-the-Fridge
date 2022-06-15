import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { isMongoDBRecipe } from "../../../utils/isMongoDBRecipe";
import { getArticle } from "../../../utils/articlesFromPage";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != "GET") {
    throw new Error("Not allowed");
  }
  const { id } = req.query as Record<string, string>;
  const isMongoRecipe = isMongoDBRecipe(id);
  if (!isMongoRecipe) {
    const article = await getArticle(
      `https://www.povarenok.ru/recipes/show/${req.query.id}`
    );
    return res.json(article);
  } else {
    //  TODO: fetch recipe from mongodb and give it back.
  }
}

export default handler;
