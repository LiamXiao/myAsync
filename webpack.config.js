module.exports = {
  entry: './src/index.js',
  output: {
    filename: './build/bundle.js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  }
};