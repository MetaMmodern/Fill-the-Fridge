import type { NextApiRequest, NextApiResponse } from "next";
import { articlesFromPage } from "../../../utils/articlesFromPage";

import middleware from "../../../middleware/middleware";
import nextConnect from "next-connect";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.use(middleware);

handler.post<NextApiRequest & { files: any }, NextApiResponse>(
  async (req, res) => {
    const data = req.body;
    const files = req.files;

    // console.log(data);
    // console.log(files);
    //TODO: Make saving to database with user attached

    return res.json({ id: "123456" });
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
