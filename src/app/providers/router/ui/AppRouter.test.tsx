import { screen } from '@testing-library/react'
import { MockBrowserRouter } from '@/shared/config/tests/MockBrowserRouter/testing'
import { MockStore } from '@/shared/config/tests/MockStore/MockStore'
import { MockTranslation } from '@/shared/config/tests/MockTranslation/MockTranslation'
import { RenderWithMocks } from '@/shared/config/tests/RenderWithMocks/RenderWithMocks'
import { getAboutRoute, getAdminRoute, getUsersSettingsRoute } from '@/shared/const/RoutPaths'
import { AppRouter } from './AppRouter'

describe('AppRouter', () => {
	test('AboutPage should be rendered', async () => {
		RenderWithMocks(<AppRouter />, [
			MockBrowserRouter(getAboutRoute()),
			MockStore({}),
			MockTranslation,
		])

		const page = await screen.findByTestId('about-page')
		expect(page).toBeInTheDocument()
	})
	test('Users settings page should be rendered', async () => {
		RenderWithMocks(<AppRouter />, [
			MockBrowserRouter(getUsersSettingsRoute()),
			MockStore({
				user: {
					_initialized: true,
					authData: {
						id: 1,
					},
				},
			}),
			MockTranslation,
		])
		const settingsPage = await screen.findByTestId('user-settings-page')
		expect(settingsPage).toBeInTheDocument()
	})
	test('NotFound page should be rendered', async () => {
		RenderWithMocks(<AppRouter />, [MockBrowserRouter('/test'), MockStore({}), MockTranslation])

		const page = await screen.findByTestId('not-found-page')
		expect(page).toBeInTheDocument()
	})
	test('Should redirect to forbidden page when user is not authorized', async () => {
		RenderWithMocks(<AppRouter />, [
			MockBrowserRouter(getAdminRoute()),
			MockStore({}),
			MockTranslation,
		])

		const page = await screen.findByTestId('forbidden-page')
		expect(page).toBeInTheDocument()
	})
	test('Should redirect to forbidden page even if user is authorized', async () => {
		RenderWithMocks(<AppRouter />, [
			MockBrowserRouter(getAdminRoute()),
			MockStore({
				user: {
					_initialized: true,
					authData: {
						id: 1,
						roles: ['USER'],
					},
				},
			}),
			MockTranslation,
		])

		const page = await screen.findByTestId('forbidden-page')
		expect(page).toBeInTheDocument()
	})
	test('Should render admin page if user has access', async () => {
		RenderWithMocks(<AppRouter />, [
			MockBrowserRouter(getAdminRoute()),
			MockStore({
				user: {
					_initialized: true,
					authData: {
						id: 1,
						roles: ['ADMIN', 'MANAGER'],
					},
				},
			}),
			MockTranslation,
		])

		const page = await screen.findByTestId('admin-page')
		expect(page).toBeInTheDocument()
	})
})
