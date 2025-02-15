module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/, // Match .js files
        exclude: /node_modules/, // Exclude the node_modules folder
        use: {
          loader: "babel-loader", // Use the Babel loader
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"], // Use the React and ES6 presets
            plugins: ["@babel/plugin-transform-runtime"], // Use the runtime transform plugin
          },
        },
      },
    ],
  },
};
