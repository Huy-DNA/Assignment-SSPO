import process from 'process';
import path from 'path';

export default [
  {
    entry: './frontend/index.jsx',
    output: {
      path: path.resolve(process.cwd(), './.dist/frontend'),
      filename: 'index.js',
    },
    mode: 'development',
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /tests/,
          use: ['babel-loader'],
        },
        {
          test: /\.(png|jpeg|gif|jpg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images',
          },
        },
      ],
    },
  },
];
