import type { NextApiRequest, NextApiResponse } from 'next'
import { articlesFromPage } from '../../../utils/articlesFromPage';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {page} = req.query;
  const whatToSearch = await articlesFromPage(req.body.ings, "0");
  return res.json({ recipesArray: whatToSearch });
}
