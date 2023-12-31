import webpack from 'webpack'
import { BuildOptions } from './types/config'

const buildResolves = (options: BuildOptions): webpack.ResolveOptions => {
	return {
		extensions: ['.tsx', '.ts', '.js'],
		modules: [options.paths.src, 'node_modules'],
		preferAbsolute: true,
		mainFiles: ['index'],
		alias: {
			'@': options.paths.src
		},
	}
}

export default buildResolves