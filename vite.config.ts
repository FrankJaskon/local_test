import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
	plugins: [
		react(),
		svgr({
			exportAsDefault: true,
			svgrOptions: {
				icon: true,
				svgoConfig: {
					plugins: {
						name: 'convertColors',
						params: {
							currentColor: true,
						},
					},
				},
			},
		}),
	],
	resolve: {
		alias: [{ find: '@', replacement: '/src' }],
	},
	define: {
		__iS_DEV__: JSON.stringify(true),
		__API_URL__: JSON.stringify('http://localhost:8000'),
		__PROJECT__: JSON.stringify('frontend'),
	},
})
