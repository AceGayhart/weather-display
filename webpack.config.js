const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    // Entry point of the application
    entry: path.resolve(__dirname, './src/index.tsx'),

    // Output configuration
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.[contenthash].js',
      publicPath: '/',
    },

    // Enable source maps for development mode
    devtool: isProduction ? 'source-map' : 'eval-source-map',

    // Resolving file extensions
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },

    // Loaders and rules
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.module\.css$/, // Regex for .module.css files
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                  exportLocalsConvention: 'camelCase',
                }, // Enable CSS modules
                importLoaders: 1,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/, // Exclude .module.css files
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        // Add Babel loader if you are using Babel in your project
        // {
        //   test: /\.(js|jsx|ts|tsx)$/,
        //   exclude: /node_modules/,
        //   use: {
        //     loader: 'babel-loader',
        //     options: {
        //       presets: [
        //         '@babel/preset-env',
        //         '@babel/preset-react',
        //         '@babel/preset-typescript',
        //       ],
        //     },
        //   },
        // },
      ],
    },

    // Plugins
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new CleanWebpackPlugin(), // Clean dist folder before build
      new Dotenv(),
    ],

    // Development server configuration
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3000,
      historyApiFallback: true, // For React Router
    },

    // Additional optimizations for production
    ...(isProduction && {
      optimization: {
        splitChunks: {
          chunks: 'all',
        },
      },
    }),
  };
};
