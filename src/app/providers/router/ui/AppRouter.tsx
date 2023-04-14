import { FC, ReactNode, Suspense, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import { PageLoader } from 'widgets/PageLoader'
import { RequireAuth } from './RequireAuth'
import { AuthRouteProps, routerConfig } from './routeConfig'
import { RequireRoles } from './RequireRoles'

export const AppRouter: FC = () => {

	const renderWithWrapper = useCallback((route: AuthRouteProps) => {
		const element = <Suspense fallback={<PageLoader />}>
			{route.element}
		</Suspense>

		const definedElement = (element: JSX.Element) => {
			if (route.authOnly) {
				if (route?.roles && route?.roles?.length > 0) {
					return <RequireRoles roles={route.roles}>
						{element}
					</RequireRoles>
				} else {
					return <RequireAuth>
						{element}
					</RequireAuth>
				}
			} else {
				return element
			}
		}

		return <Route
			key={route.path}
			path={route.path}
			element={definedElement(element)}
		/>
	}, [])

	return <Routes>
		{routerConfig.map(route => renderWithWrapper(route))}
	</Routes>
}