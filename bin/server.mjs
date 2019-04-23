import path from "path";
import webpack from "webpack";
import webpackConfig from "../webpack.config.js";
import WebpackDevServer from "webpack-dev-server";
import after from "../src/after";

const port = 3000;
const dirname = path.resolve(path.dirname(""));

const compiler = webpack(webpackConfig());

const server = new WebpackDevServer(compiler, {
  headers: { "Access-Control-Allow-Origin": "*" },
  disableHostCheck: true,
  stats: { colors: true },
  contentBase: [`${dirname}/dist`, `${dirname}/src`],
  publicPath: "/",
  hot: true,
  inline: true,
  watchContentBase: true,
  after: after({ dirname })
});

server.listen(port, "0.0.0.0", err => {
  if (err) throw err;
  console.log(`Starting root server on 0.0.0.0:${port}`);
});
