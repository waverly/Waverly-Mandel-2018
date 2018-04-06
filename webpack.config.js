// We are using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //  -> ADDED IN THIS STEP

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, "dist"),
  STATIC: path.resolve(__dirname, "static"),
  SRC: path.resolve(__dirname, "src"),
  JS: path.resolve(__dirname, "src/js")
};

// Webpack configuration
module.exports = {
  entry: path.join(paths.SRC, "index.js"),
  output: {
    path: paths.DIST,
    filename: "app.bundle.js"
  },
  // Tell webpack to use html plugin
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, "index.html")
    }),
    new ExtractTextPlugin("style.bundle.css") // CSS will be extracted to this bundle file -> ADDED IN THIS STEP
  ],
  // Loaders configuration
  // We are telling webpack to use "babel-loader" for .js and .jsx files
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      // CSS loader to CSS files -> ADDED IN THIS STEP
      // Files will get handled by css loader and then passed to the extract text plugin
      // which will write it to the file we defined above
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader", "postcss-loader"]
        })
      },
      {
        test: /\.(png|jpg|gif|pdf)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  },
  // Enable importing JS files without specifying their's extenstion
  //
  // So we can write:
  // import MyComponent from './my-component';
  //
  // Instead of:
  // import MyComponent from './my-component.jsx';
  resolve: {
    alias: {
      Src: path.resolve(__dirname, "src"),
      Static: path.resolve(__dirname, "static"),
      Components: path.resolve(__dirname, "src/js/components"),
      Views: path.resolve(__dirname, "src/js/views"),
      Styles: path.resolve(__dirname, "src/css")
    },
    extensions: [".js", ".jsx"]
  }
};
