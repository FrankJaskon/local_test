import webpack, { RuleSetRule } from 'webpack'
import path from 'path'
import { styleLoader } from '../../config/build/Loaders/styleLoader'
import { BuildPaths } from '../../config/build/types/config'
import { svgLoader } from '../../config/build/Loaders/svgLoader'
import { imgLoader } from '../../config/build/Loaders/imgLoader'

const config = ({ config }: { config: webpack.Configuration }): webpack.Configuration => {
	const paths: BuildPaths = {
		assets: {
			svg: '',
			images: ''
		},
		entry: '',
		html: '',
		output: '',
		src: path.resolve(__dirname, '..', '..', 'src')
	}

	if ( config.module?.rules ) {
		config.module.rules = config.module.rules.map((rule) => {
			if (/svg/.test((rule as RuleSetRule ).test as string)) {
				return svgLoader()
			}
			return rule
		})

		config.module.rules.push(styleLoader(true))
		config.module.rules.push(imgLoader())
	}

	if ( config.resolve ) {
		config.resolve?.modules?.push(paths.src)
		config.resolve?.extensions?.push('.ts, .tsx')
	}

	return config
}

module.exports = config