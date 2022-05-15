import type { NextApiRequest, NextApiResponse } from 'next'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      {const article = await getArticle(`https://www.povarenok.ru/recipes/show/${req.query.id}`);
    return  res.json(article);}
    case 'POST':
{const article = await getArticle(`https://www.povarenok.ru/recipes/show/${ctx.params.id}`);
  return ctx.render('reciepPage', article);}
  
    default:
      break;
  }

}
