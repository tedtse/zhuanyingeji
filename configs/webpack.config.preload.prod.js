const path = require('path')

module.exports = {
  mode: 'production',
  target: 'electron-preload',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: [
    'core-js',
    'regenerator-runtime/runtime',
    path.join(__dirname, '..', 'nodejs/index.js'),
  ],
  output: {
    path: path.join(__dirname, '..', 'nodejs'),
    libraryTarget: 'commonjs2',
    filename: 'index.prod.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: ['node_modules'],
  }
}