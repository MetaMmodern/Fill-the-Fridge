const KoaRouter = require('koa-router');
const { articlesFromPage, getArticle } = require('../articlesFromPage');
const getCart = require('../getPrice');

const router = new KoaRouter();
router.get('/', ctx => {
  return ctx.render('../public/index');
});
router.get('/recipe/:id', async ctx => {
  const article = await getArticle(`https://www.povarenok.ru/recipes/show/${ctx.params.id}`);
  return ctx.render('../public/reciepFull', article);
});

router.post('/recipes/search/:page', async ctx => {
  const whatToSearch = await articlesFromPage(ctx.request.body.ings, ctx.params.page);
  return ctx.render('searchResults', { recipesArray: whatToSearch });
});

router.post('/recipe/:id', async ctx => {
  const article = await getArticle(`https://www.povarenok.ru/recipes/show/${ctx.params.id}`);
  return ctx.render('reciepPage', article);
});
router.post('/Cart', async ctx => {
  const result = await getCart(ctx.request.body);
  // eslint-disable-next-line no-return-assign
  return (ctx.body = result);
});

module.exports = router.middleware();
