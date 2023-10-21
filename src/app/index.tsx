import { FC, Suspense, useEffect } from 'react'
import { initUserData, useInitializedUser } from '@/entities/User'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch'
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout'
import { MainLayout } from '@/shared/layouts/MainLayout'
import { ToggleFeatures } from '@/shared/lib/features'
import { PageLoader } from '@/widgets/PageLoader'
import { useSelectToolbarItem } from './lib/useSelectToolbarItem'
import { AppRouter } from './providers/router'
import { Navbar, Sidebar } from './ui'

const App: FC = () => {
	const dispatch = useAppDispatch()
	const isInitialized = useInitializedUser()
	const toolbarItem = useSelectToolbarItem()
	useEffect(() => {
		dispatch(initUserData())
	}, [dispatch])

		// some comment
		// some comment
		// some comment

	if (!isInitialized) {
		return (
			<ToggleFeatures
				feature='isAppRedesigned'
				off={<PageLoader fullHeight />}
				on={<AppLoaderLayout />}
			/>
		)
	}

	return (
		<ToggleFeatures
			feature='isAppRedesigned'
			off={
				<div className={'App'}>
					<Suspense fallback={''}>
						<Navbar />
						<div className='content-wrapper'>
							<Sidebar />
							{<AppRouter />}
						</div>
					</Suspense>
				</div>
			}
			on={
				<div className={'App-redesign'}>
					<Suspense fallback={<AppLoaderLayout />}>
						<MainLayout
							header={<Navbar />}
							content={<AppRouter />}
							sidebar={<Sidebar />}
							toolbar={toolbarItem}
						/>
					</Suspense>
				</div>
			}
		/>
	)
}

export default App
