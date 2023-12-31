import path from 'path'
import * as webpack from 'webpack'
import buildWebpackConfig from './config/build/buildWebpackConfig'
import { BuildEnv, BuildMode, BuildPaths } from './config/build/types/config'

export default (env: BuildEnv) => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		output: path.resolve(__dirname, 'dist'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src'),
		assets: {
			svg: path.join('icons', '[name].[contenthash][ext]'),
			images: path.join('images', '[name].[contenthash][ext]'),
			favicon: path.resolve(__dirname, 'src', 'shared', 'assets', 'icons', 'favicon.ico'),
		},
		locales: path.resolve(__dirname, 'public', 'locales'),
		buildLocales: path.resolve(__dirname, 'dist', 'locales'),
	}

	const analyzed: boolean = env?.analyzed || false

	const mode: BuildMode = env?.mode || 'development'

	const PORT: number = env?.port || 3000

	const apiUrl: string = env?.apiUrl || 'http://localhost:8000'

	const isDev: boolean = mode === 'development'

	const config: webpack.Configuration = buildWebpackConfig({
		mode,
		paths,
		isDev,
		apiUrl,
		port: PORT,
		analyzed,
		project: 'frontend',
	})

	return config
}
