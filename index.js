'use strict'
const Koa = require('koa')
const app = new Koa()
const chalk = require('chalk')
const debug = require('debug')('index')
const morgan = require('koa-morgan')
const path = require('path')
const rfs = require('rotating-file-stream')
const render = require('koa-ejs')
const KoaRouter = require('koa-router')
const port = process.env.PORT || 3000
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})
const router = new KoaRouter()
app.use(morgan('tiny', { stream: accessLogStream }))
render(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: true
})
router.get('/', (ctx) => {
  return ctx.render('index')
})

app.use(router.routes())
app.listen(port, function () {
  debug(`listening on port ${chalk.green('3000')}`)
})
