import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'

export const styleLoader = (isDev: boolean): webpack.RuleSetRule => ({
	test: /\.s[ac]ss$/i,
	exclude: /node_modules/,
	use: [
		isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: {
				modules: {
					auto: (resourcePath: string) => Boolean(resourcePath.includes('.module.')),
					localIdentName: isDev
						? '[path][name]__[local]--[hash:base64:5]'
						: '[hash:base64:5]'
				},
			}
		},
		'sass-loader',
	],
})