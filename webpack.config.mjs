import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import process from 'process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const ASSET_PATH = process.env.ASSET_PATH || '/';
// Dev defaults to local macovin-backend. Production needs an explicit env.
const API_BASE_URL =
  process.env.MACOVIN_API_BASE_URL ??
  (isProduction ? '' : 'http://localhost:3001');

export default {
  entry: './src/main.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: ASSET_PATH,
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['tailwindcss', 'autoprefixer'],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
      'process.env.MACOVIN_API_BASE_URL': JSON.stringify(API_BASE_URL),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    // 5173 matches macovin-backend CORS defaults for local Vite-style hosts.
    port: 5173,
    historyApiFallback: true,
    open: false,
  },
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'eval-source-map',
};
