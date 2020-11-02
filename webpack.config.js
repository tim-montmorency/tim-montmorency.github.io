/**
 * webpack.config.js
 * =================
 */

const chalk = require('chalk');
const globImporter = require('node-sass-glob-importer');
const log = require('fancy-log');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const DonePlugin = require('./hooks/done');
const WatchRunPlugin = require('./hooks/watch-run');

const config = {
  debug: false,
  path: {
    dist: './js/',
    public: './public/',
    src: './src',
  },
};

module.exports = (env, options) => {
  const isDev = options.mode === 'development';

  log(`Starting '${chalk.cyan('build')}' in '${chalk.blue(options.mode)}' mode...`);

  return {
    cache: false,
    devtool: isDev ? 'inline-source-map' : false,
    entry: {
      tim: `${config.path.src}/js/tim.js`,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader', // config file can be found at _frontend/.babelrc.js
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            'vue-style-loader',
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'postcss-loader', // config file can be found at _frontend/.postcssrc.js
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  importer: globImporter(),
                },
              },
            },
          ],
        },
        {
          enforce: 'pre',
          test: /\.(js)$/,
          exclude: /node_modules/,
          loader: 'eslint-loader', // config file can be found at _frontend/.eslintrc.js
          options: {
            cache: true,
          },
        },
      ],
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false,
            },
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    },
    output: {
      chunkFilename: 'name].[hash].js',
      filename: '[name].js',
      path: path.resolve(__dirname, config.path.public),
      publicPath: config.path.public,
    },
    plugins: [
      config.debug ? new BundleAnalyzerPlugin() : null,
      new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['js/**/*', '!.gitkeep'] }),
      new MiniCssExtractPlugin({ filename: '[name].css' }),
      new StylelintPlugin(),
      new DonePlugin(),
      new WatchRunPlugin(),
    ].filter(Boolean),
    resolve: {
      extensions: ['*', '.js', '.json'],
    },
    stats: 'errors-warnings',
    watchOptions: {
      ignored: /node_modules/,
    },
  };
};
