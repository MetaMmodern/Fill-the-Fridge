'use strict'
const Koa = require('koa')
const serve = require('koa-static')
const morgan = require('koa-morgan')
const render = require('koa-ejs')
const KoaRouter = require('koa-router')
const koaBody = require('koa-bodyparser')
const chalk = require('chalk')
const debug = require('debug')('index')
const path = require('path')
const rfs = require('rotating-file-stream')
const { articlesFromPage, getArticle } = require('./articlesFromPage')
const app = new Koa()
const port = process.env.PORT || 3000
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})
const router = new KoaRouter()
app.use(serve('./public'))
app.use(morgan('tiny', { stream: accessLogStream }))
render(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: false
})
router.get('/', (ctx) => {
  return ctx.render('../public/index')
})

router.post('/recipes/search', async (ctx) => {
  debug(`the request body is ${chalk.green(ctx.request.body)}`)
  const whatToSearch = await articlesFromPage(
    ctx.request.body.ings,
    ctx.request.body.page
  )
  return ctx.render('searchResults', { recipesArray: whatToSearch })
})

router.get('/recipe/:id', async (ctx) => {
  debug(ctx.params.id)
  const article = await getArticle(
    'https://www.povarenok.ru/recipes/show/' + ctx.params.id
  )
  debug(article)
  // TO DO
  return ctx.render('reciepPage', article)
})

app.use(koaBody())
  .use(router.allowedMethods())
  .use(router.routes())
  .use(async (ctx) => {
    // the parsed body will store in ctx.request.body
    // if nothing was parsed, body will be an empty object {}
    ctx.body = ctx.request.body
  })

app.listen(port, function () {
  debug(`listening on port ${chalk.green('3000')}`)
})
