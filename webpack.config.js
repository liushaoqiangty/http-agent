const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js"
  },

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
    before: function(app, server) {
      app.get("/api/userdata", function(req, res) {
        res.json({ width: "100px", height: "100px", background: "green" });
      });
    },
    proxy: {
      "/search": {
        target: "https://api.github.com/",
        changeOrigin: true,
        secure: false
      }
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      //   filename: "main.html",
      template: "./index.html",
      inject: "body"
    })
  ]
};
