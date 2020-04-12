'use strict'
const Koa = require('koa')
const app = new Koa()
const chalk = require('chalk')
const debug = require('debug')('index')
const morgan = require('koa-morgan')
const path = require('path')
const rfs = require('rotating-file-stream')
const port = process.env.PORT || 3000
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})
app.use(morgan('tiny', { stream: accessLogStream }))

app.use(function * () {
  this.body = 'Hello world!'
})
app.listen(port, function () {
  debug(`listening on port ${chalk.green('3000')}`)
})
