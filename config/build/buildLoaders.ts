import webpack from 'webpack';
import { BuildOptions, Locale } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const cssLoader = buildCssLoader(options.isDev);

  const babelLoader = {
    test: /\.(js|jsx|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: [
          [
            'i18next-extract',
            { locales: [Locale.EN, Locale.UA], keyAsDefaultValue: true },
          ],
        ],
      },
    },
  };

  return [fileLoader, babelLoader, typescriptLoader, cssLoader, svgLoader];
}
