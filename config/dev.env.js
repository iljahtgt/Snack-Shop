'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_APIPATH:'"https://vue-course-api.hexschool.io"',
  VUE_APP_CUSTOMPATH:'"snackshop"',
  favicon: path.resolve('../favicon.ico'),
})
