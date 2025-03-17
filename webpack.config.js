const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: '/dist/'
  },
  devtool: "eval-source-map",
  devServer: {
    hot: true,
    watchFiles: ["./src/**/*"],
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: 'body',
      scriptLoading: 'module',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};