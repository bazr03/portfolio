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
    index: path.resolve(__dirname, "src/js/index.js"),
    cv: path.resolve(__dirname, "src/js/cv.js")
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
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
            cacheCompression : false
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                  plugins: [
                    [
                      "postcss-preset-env",
                      {
                        // Options
                      }
                    ]
                  ]
                }
            }
        },
          {
            loader: 'sass-loader',
            options:{
              sourceMap:true,
              sassOptions:{
                outputStyle: "expanded",
              }
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|jpeg|svg)$/,
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
        collapseWhitespace: false,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new HtmlWebpackPlugin({
        template: 'src/cv.html',
        filename: 'cv.html',
        chunks : ['cv'],
        minify:{
            collapseWhitespace:false,
            removeComments:true,
            removeRedundantAttributes:true,
            removeScriptTypeAttributes:true,
            removeStyleLinkTypeAttributes:true,
            useShortDoctype:true
        }
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    })
  ]
};
