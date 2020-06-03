'use strict';

const {
  default: sslify, // middleware factory со стандартными опциями
  xForwardedProtoResolver: resolver // resolver, который устанавливает x-forwarded-proto хэдер, требуемый для редиректа на Heroku
} = require('koa-sslify');

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

app.use(serve('./public'));
app.use(morgan('tiny', { stream: accessLogStream }));
render(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: false
});

app
  .use(sslify({ resolver, hostname: 'fillthefridge.me' }))
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
