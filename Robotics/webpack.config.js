const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, "../../Infinity8sailor.github.io/Robotics"),
    filename: 'github.js'
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
        { test: /\\.css$/i, 
          use: [
          // [style-loader](/loaders/style-loader)
          { loader: 'style-loader' },
          // [css-loader](/loaders/css-loader)
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
         },]
        }
        // {
        //   test:/\.css$/,
        //   loader: ["style-loader,css-loader"]
        // }
      ]
    }
  };
