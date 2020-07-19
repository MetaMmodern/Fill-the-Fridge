/* eslint-disable no-template-curly-in-string */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const optimization = () => {
  const config = { splitChunks: { chunks: 'all' } };
  if (isProd) {
    config.minimizer = [new OptimizeCssAssetsWebpackPlugin(), new TerserWebpackPlugin()];
  }
  return config;
};
module.exports = {
  context: path.resolve(__dirname, 'public'),
  mode: 'development',
  entry: './assets/js/main.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      minify: { collapseWhitespace: isProd }
    }),
    new HTMLWebpackPlugin({
      filename: 'reciepFull.ejs',
      template: './reciepFull.html',
      inject: true,
      // eslint-disable-next-line no-template-curly-in-string
      name: '<%= `Fill the Fridge: ${name}` %>',
      link: '<%= link %>',
      image: '<%= image %>',
      description: '<%= `${reciep.substr(0, 127)}...` %>',
      ings:
        '<%for (const element of ingredients) {%><li class="list-group-item"><span><%= element.item %></span>&mdash;<%= element.amount %></li><% }%>',
      reciep: '<%= reciep %>'
    }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/assets/images/ogimage.png'),
          to: path.resolve(__dirname, 'dist/images')
        }
      ]
    })
  ],
  optimization: optimization(),
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: () => {
          const loaders = [{ loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } }];
          if (isDev) {
            loaders.push('eslint-loader');
          }
          return loaders;
        }
      },
      {
        test: /.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: { outputPath: 'images' }
          },
          'image-webpack-loader'
        ]
      }
    ]
  }
};
