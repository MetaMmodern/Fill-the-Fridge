import { MongoClient, ObjectId } from "mongodb";
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
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();
    const collection = db.collection("recipes");
    console.log(id);
    const result = await collection.findOne({ _id: new ObjectId(id) });
    client.close();
    if (result) {
      console.log(result);
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ error: "Recipe not found" })
    }

  }
}

export default handler;
