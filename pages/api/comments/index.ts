// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { CommentsResponse } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommentsResponse>
) {
  if (req.method == "GET") {
    const { recipeId } = req.query;
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();
    const collection = db.collection("comments");
    const comments = await collection.find({ recipeId }, { _id: 0 }).toArray();
    client.close();
    return res.status(200).json({
      comments,
    } as any);
  } else if (req.method == "POST") {
    const session = await getSession({ req });
    if (!session?.user?.id) {
      return res.status(401).end();
    }

    const { recipeId, comment }: Record<string, string> = JSON.parse(req.body);
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();
    const collection = db.collection("comments");
    const commenObj = { recipeId, comment, author: session.user.id };
    await collection.insertOne(commenObj);

    client.close();
    return res.status(201);
  }
}
