import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'app/providers/ThemeProvider'
import { StoreProvider } from 'app/providers/StoreProvider'
import App from './app'
import 'app/styles/index.scss'
import '@/shared/config/i18n/i18n'
import { ErrorBoundary } from 'app/providers/ErrorBoundary'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<BrowserRouter>
	<StoreProvider>
		<ErrorBoundary>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</ErrorBoundary>
	</StoreProvider>
</BrowserRouter>)

// render(
// 	<React.StrictMode>
// 		<BrowserRouter>
// 			<StoreProvider>
// 				<ErrorBoundary>
// 					<ThemeProvider>
// 						<App />
// 					</ThemeProvider>
// 				</ErrorBoundary>
// 			</StoreProvider>
// 		</BrowserRouter>
// 	</React.StrictMode>,
// 	document.getElementById('root')
// )