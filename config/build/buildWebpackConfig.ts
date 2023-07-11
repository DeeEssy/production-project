import webpack from "webpack";
import { BuildOptions } from "./types/config";
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolves } from './buildResolves';
import { buildLDevServer } from "./buildDevServer";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const {mode, paths, isDev} = options;

    return {
        mode,
        entry: paths.entry,
        output: {
            path: paths.build,
            filename: "[name].[contenthash].js",
            clean: true,
        },
        module: {
            rules: buildLoaders(options)
        },
        plugins: buildPlugins(paths),
        resolve: buildResolves(options),
        devtool: isDev ? 'inline-source-map' : false,
        devServer: isDev ? buildLDevServer(options) : undefined
    }
}