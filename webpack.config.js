const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

module.exports = {
  entry: {
    index: path.resolve(__dirname, "src/js/index.js")
    //nosotros: path.resolve(__dirname, 'src/js/nosotros.js')
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].boundle.js"
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
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "static/"
            }
          }
        ]
      },
      {
        test: /\.svg/,
        use: {
            loader: 'svg-url-loader',
            options: {}
        }
    }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        fooStyles: {
          name: "index",
          test: (m, c, entry = "index") =>
            m.constructor.name === "CssModule" && recursiveIssuer(m) === entry,
          chunks: "all",
          enforce: true
        },
        barStyles: {
          name: "nosotros",
          test: (m, c, entry = "nosotros") =>
            m.constructor.name === "CssModule" && recursiveIssuer(m) === entry,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "index.html",
      chunks: ["index"],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    // new HtmlWebpackPlugin({
    //     template: 'src/nosotros.html',
    //     filename: 'nosotros.html',
    //     chunks : ['nosotros'],
    //     minify:{
    //         collapseWhitespace:true,
    //         removeComments:true,
    //         removeRedundantAttributes:true,
    //         removeScriptTypeAttributes:true,
    //         removeStyleLinkTypeAttributes:true,
    //         useShortDoctype:true
    //     }
    // }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    })
  ]
};
