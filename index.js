'use strict';

const Koa = require('koa');
const serve = require('koa-static');
const morgan = require('koa-morgan');
const render = require('koa-ejs');
const KoaRouter = require('koa-router');
const koaBody = require('koa-bodyparser');
const path = require('path');
const rfs = require('rotating-file-stream');
const { articlesFromPage, getArticle } = require('./articlesFromPage');
const getCart = require('./getPrice');

const app = new Koa();
const port = process.env.PORT || 3000;
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
});
const router = new KoaRouter();
app.use(serve('./public'));
app.use(morgan('tiny', { stream: accessLogStream }));
render(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: false
});
router.get('/', ctx => {
  return ctx.render('../public/index');
});
router.get('/recipe/:id', async ctx => {
  const article = await getArticle(`https://www.povarenok.ru/recipes/show/${ctx.params.id}`);
  console.log('requested recip');
  return ctx.render('../public/reciepFull', article);
});

router.post('/recipes/search/:page', async ctx => {
  const whatToSearch = await articlesFromPage(ctx.request.body.ings, ctx.params.page);
  return ctx.render('searchResults', { recipesArray: whatToSearch });
});

router.post('/recipe/:id', async ctx => {
  const article = await getArticle(`https://www.povarenok.ru/recipes/show/${ctx.params.id}`);
  // TO DO
  return ctx.render('reciepPage', article);
});
router.post('/Cart', async ctx => {
  const result = await getCart(ctx.request.body);
  // eslint-disable-next-line no-return-assign
  return (ctx.body = result);
});
app
  .use(koaBody())
  .use(router.allowedMethods())
  .use(router.routes())
  .use(async ctx => {
    // the parsed body will store in ctx.request.body
    // if nothing was parsed, body will be an empty object {}
    ctx.body = ctx.request.body;
  });

app.listen(port);
