import webpack from 'webpack'
import buildDevServer from './buildDevServer'
import buildLoaders from './buildLoaders'
import buildPlugins from './buildPlugins'
import buildResolves from './buildResolves'
import { BuildOptions } from './types/config'

const buildWebpackConfig = (options: BuildOptions): webpack.Configuration => {
    const {mode, paths, isDev} = options
    return {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.output,
            clean: true
        },
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolves(),
        plugins: buildPlugins(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined
    }
}

export default buildWebpackConfig