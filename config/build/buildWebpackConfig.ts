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
        module: {
            rules: buildLoaders(options)
        },
        output: {
            path: paths.build,
            filename: "[name].[contenthash].js",
            clean: true,
        },
        resolve: buildResolves(),
        plugins: buildPlugins(paths),
        devtool: isDev ? 'inline-source-map' : false,
        devServer: isDev ? buildLDevServer(options) : undefined
    }
}