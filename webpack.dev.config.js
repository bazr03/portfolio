const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  entry: {
    index: path.resolve(__dirname, "src/js/index.js")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].boundle.js",
    publicPath: 'http://localhost:9000/',
    chunkFilename: "js/[id].[chunckhash].js"
  },
  mode: "development",
  devServer: {
    open: true,
    port: 9000,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(jpg|png|gif|jpeg|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: 'static/',
              useRelativePath: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,  "src/index.html"),
      filename: "index.html"
    }),
    // new HtmlWebpackPlugin({
    //     template: 'src/nosotros.html',
    //     filename: 'nosotros.html',
    // }),
  ]
};
