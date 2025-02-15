import { merge } from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;

import commonConfig from "./webpack.common.js";

const devConfig = {
  mode: "development",
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

export default merge(commonConfig, devConfig);
