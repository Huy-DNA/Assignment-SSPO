import process from 'process';
import path from 'path';

export default [
  {
    entry: './frontend/index.js',
    output: {
      path: path.resolve(process.cwd(), './.dist/frontend'),
      filename: 'index.js',
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /^frontend\\.*\.(js|jsx)$/,
          exclude: /frontend\\tests/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
  },
];
