const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function({ mode = "development" } = {}) {
  return {
    mode,
    entry: `${__dirname}/src/index.js`,
    output: {
      path: `${__dirname}/dist`,
      filename: "index.js"
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        hash: true,
        template: `${__dirname}/src/index.html`,
        filename: "index.html"
      })
    ]
  };
};
