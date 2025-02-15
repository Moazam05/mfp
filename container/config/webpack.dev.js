const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// Custom Import
const commonConfig = require("./webpack.common");

const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8080/", // Add this line
  },
  devServer: {
    port: 8080,
    historyApiFallback: true, // Simplify this to true
    headers: {
      "Access-Control-Allow-Origin": "*", // Add CORS headers
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
