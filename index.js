'use strict';

const Koa = require('koa');
const serve = require('koa-static');
const morgan = require('koa-morgan');
const render = require('koa-ejs');
const KoaRouter = require('koa-router');
const koaBody = require('koa-bodyparser');
const path = require('path');
const rfs = require('rotating-file-stream');

const app = new Koa();
const port = process.env.PORT || 3000;
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
});
const router = new KoaRouter();
const middleware = require('./routes/index');

app.use(morgan('tiny', { stream: accessLogStream }));
render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: false
});

app
  .use(async (ctx, next) => {
    // if (ctx.get('X-Forwarded-Proto') !== 'https' && ctx.get('X-Forwarded-Port') !== '443') {
    // ctx.redirect(`https://${ctx.request.header.host}${ctx.url}`);
    // } else {
    await next();
    // }
  })
  .use(serve('public'))
  .use(koaBody())
  .use(middleware)
  .use(router.allowedMethods())
  .use(router.routes())
  .use(async ctx => {
    // the parsed body will store in ctx.request.body
    // if nothing was parsed, body will be an empty object {}
    ctx.body = ctx.request.body;
  });

app.listen(port);
