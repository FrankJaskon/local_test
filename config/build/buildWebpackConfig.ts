import webpack from 'webpack'
import buildDevServer from './buildDevServer'
import buildPlugins from './buildPlugins'
import buildResolves from './buildResolves'
import buildLoaders from './Loaders/buildLoaders'
import { BuildOptions } from './types/config'

const buildWebpackConfig = (options: BuildOptions): webpack.Configuration => {
	const { mode, paths, isDev } = options
	return {
		mode,
		entry: paths.entry,
		output: {
			filename: '[name].[contenthash].js',
			path: paths.output,
			clean: true,
			assetModuleFilename: options.paths.assets.images,
			publicPath: '/'
		},

		module: {
			rules: buildLoaders(options)
		},
		resolve: buildResolves(options),
		plugins: buildPlugins(options),
		devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
		devServer: isDev ? buildDevServer(options) : undefined,
	}
}

export default buildWebpackConfig