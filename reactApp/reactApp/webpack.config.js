module.exports = {
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
          test:/\.css$/i,
          loader:"style-loader!css-loader"
        }
      ]
    }
  };
