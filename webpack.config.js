const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  watch: true,
  cache: true,
  context: __dirname,
  entry: './src/js/main.js',
  output : {
    filename: 'main.js'
  },
  module: {
      rules: [
          {
            test: /\.pug$/,
            loader: 'pug-plain-loader'
          },
          {
              test: /\.js$/,
              loader: 'babel-loader'
          },
          {
              test: /\.vue$/,
              loader: 'vue-loader',
          },
      ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
