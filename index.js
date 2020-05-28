'use strict';

const Koa = require('koa');
const serve = require('koa-static');
const morgan = require('koa-morgan');
const render = require('koa-ejs');
const KoaRouter = require('koa-router');
const koaBody = require('koa-bodyparser');
const chalk = require('chalk');
const debug = require('debug')('index');
const path = require('path');
const rfs = require('rotating-file-stream');
const { articlesFromPage, getArticle } = require('./articlesFromPage');
const getPrice = require('./getPrice');

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

router.post('/recipes/search/:page', async ctx => {
  debug(`the request body is ${chalk.green(ctx.request.body)}`);
  const whatToSearch = await articlesFromPage(ctx.request.body.ings, ctx.params.page);
  debug(ctx.params.page);
  return ctx.render('searchResults', { recipesArray: whatToSearch });
});

router.get('/recipe/:id', async ctx => {
  debug(ctx.params.id);
  const article = await getArticle(`https://www.povarenok.ru/recipes/show/${ctx.params.id}`);
  debug(article);
  // TO DO
  return ctx.render('reciepPage', article);
});
router.post('/Cart', async ctx => {
  let listOfProducts;
  // eslint-disable-next-line no-restricted-syntax,guard-for-in
  for (const product in ctx.request.body) {
    listOfProducts = ctx.request.body[product];
  }
  // eslint-disable-next-line no-unused-vars
  const arrayOfProducts = [];
  let arrayPrice;
  const arrayOfStore = [];
  arrayOfStore[0] = {
    name: 'Novus',
    price: 0,
    count: 0
  };
  arrayOfStore[1] = {
    name: 'АТБ',
    price: 0,
    count: 0
  };

  for (let i = 0; i < listOfProducts.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    arrayPrice = await getPrice([listOfProducts[i]]);
    console.log(listOfProducts[i]);
    let object;
    // eslint-disable-next-line prefer-const
    object = arrayPrice[0].pricesAndStores;

    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in object) {
      for (let store = 0; store < arrayOfStore.length; store++)
        // eslint-disable-next-line eqeqeq
        if (arrayOfStore[store].name == object[key].store) {
          arrayOfStore[store].price += object[key].price;
          // eslint-disable-next-line no-plusplus
          arrayOfStore[store].count++;
          console.log(`${arrayOfStore[store].name} = ${object[key].price}`);
        }
    }
  }

  console.log(arrayOfStore);
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

app.listen(port, () => {
  debug(`listening on port ${chalk.green('3000')}`);
});
