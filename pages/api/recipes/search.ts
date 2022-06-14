import type { NextApiRequest, NextApiResponse } from "next";
import { articlesFromPage } from "../../../utils/articlesFromPage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const page =
      !Array.isArray(req.query.page) || !req.query.page ? req.query.page : "0";
    const whatToSearch = await articlesFromPage(req.body.ings, page);
    console.log("whatToSearch", whatToSearch);
    return res.status(200).json({ recipesArray: whatToSearch });
  }
}
