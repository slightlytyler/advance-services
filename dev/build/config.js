import fs from 'fs';
import path from 'path';
import { compose, filter, invoke, reduce } from 'lodash/fp';

const __root = path.join(__dirname, '../../');
const __dev = path.join(__root, 'dev');
const __src = path.join(__root, 'src');
const __modules = path.join(__src, 'modules');

const isDirectory = targetPath => file => compose(
  invoke('isDirectory'),
  fs.statSync,
)(path.join(targetPath, file));

const selectDirectories = targetPath => filter(
  isDirectory(targetPath),
  fs.readdirSync(targetPath),
);

const selectEntries = reduce(
  (acc, el) => ({ ...acc, [el]: './src/modules/' + el + '/index.js' }),
  {},
);

module.exports = {
  entry: compose(selectEntries, selectDirectories)(__modules),
  output: {
    libraryTarget: 'commonjs2',
    path: '.webpack',
    filename: '[name].js',
  },
  target: 'node',
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        query: {
          configFile: path.join(__dev, 'lint/dev.rc'),
          emitWarning: true,
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};