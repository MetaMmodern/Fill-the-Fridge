import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";
import fs from "fs"
import middleware from "../../../middleware/middleware";
import nextConnect from "next-connect";
import { getSession } from "next-auth/react";
import AWS from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.use(middleware);

let space = new AWS.S3({
  //Get the endpoint from the DO website for your space
  endpoint: "fra1.digitaloceanspaces.com",
  useAccelerateEndpoint: false,
  //Create a credential using DO Spaces API key (https://cloud.digitalocean.com/account/api/tokens)
  credentials: new AWS.Credentials(
    process.env.MY_AWS_ACCESS_KEY!,
    process.env.MY_AWS_SECRET_KEY!,
  ),
});

//Name of your bucket here
const BucketName = "fill-the-fridge";

handler.post<NextApiRequest & { files: any }, NextApiResponse>(
  async (req, res) => {
    const session = await getSession({ req });
    console.log("session user:", session?.user);
    if (!session?.user?.id) {
      return res.status(401).end();
    }
    const data = req.body;
    const file = req.files?.image;
    console.log(data);
    // first save the recipe
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();
    const collection = db.collection("recipes");
    const recipeObj = { ...data, ingredients: JSON.parse(data.ingredients), author: session.user.id }; // name, recipe, ingredients: {name, amount}[]
    const resultDocument = await collection.insertOne(recipeObj);
    const recipeId = resultDocument.insertedId.toString();
    // then save the image, if there is none--respond.
    if (!file) {
      client.close();
      return res.status(201).json({ recipeId });

    }

    let uploadParameters: PutObjectRequest = {
      Bucket: BucketName,
      ContentType: file.mimetype,
      Body: fs.readFileSync(file.filepath),
      Key: recipeId,
      ACL: "public-read"
    };

    const result = await new Promise<AWS.S3.ManagedUpload.SendData>((res, rej) => {
      space.upload(uploadParameters, function (error, data) {
        if (error) {
          console.error(error);
          rej(error);
          return;
        }
        res(data);
      })
    });
    // then update recipe to match the image
    try {
      const { value: updatedResult } = await collection.findOneAndUpdate({ _id: new ObjectId(recipeId) }, { $set: { image: result.Location } }, { returnDocument: "after" })
      console.log(updatedResult)
      client.close();
      return res.json({ ...updatedResult });
    } catch (error) {
      client.close();
      console.log(error);
    }

  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
