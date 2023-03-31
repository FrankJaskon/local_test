import { userActions } from 'entities/User'
import { getUserAuthData } from 'entities/User'
import { LoginModal } from 'features/AuthByUsername'
import { FC, memo, ReactNode, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RoutePaths } from 'shared/config/RoutePaths/RoutPaths'
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch'
import classNames from 'shared/lib/classNames/classNames'
import { AppButton, ButtonVariant } from 'shared/ui/AppButton'
import { AppLink, AppLinkVariant } from 'shared/ui/AppLink/AppLink'
import { Text, TextColor } from 'shared/ui/Text'
import cls from './Navbar.module.scss'

interface NavbarProps {
	className?: string
}

export const Navbar: FC<NavbarProps> = memo((props: NavbarProps) => {
	const { className } = props
	const { t } = useTranslation()
	const [isAuthModal, setIsAuthModal] = useState<boolean>(false)
	const authData = useSelector(getUserAuthData)
	const dispatch = useAppDispatch()

	const openModal = useCallback(() => {
		setIsAuthModal(true)
	}, [])

	const closeModal = useCallback(() => {
		setIsAuthModal(false)
	}, [])

	const onLogout = useCallback(() => {
		dispatch(userActions.removeAuthData())
	}, [dispatch])

	let content: ReactNode

	if (authData) {
		content = <div className={cls.linksGroup}>
			<AppLink
				className={cls.link}
				to={RoutePaths.articles_details_new}
				variant={AppLinkVariant.CUSTOM_BUTTON}
			>
				{t('navbar.create-article')}
			</AppLink>
			<AppButton
				className={cls.link}
				variant={ButtonVariant.CUSTOM}
				onClick={onLogout}>
				{t('navbar.logout')}
			</AppButton>
		</div>
	} else {
		content = <>
			<div className={cls.linksGroup}>
				<AppButton
					className={classNames(cls.link, {}, [cls.login])}
					variant='custom'
					onClick={openModal}>
					{t('navbar.login')}
				</AppButton>
			</div>
			<LoginModal
				isOpen={isAuthModal}
				onClose={closeModal} />
		</>
	}

	return <header className={classNames(cls.Navbar, {}, [className])}>
		<AppLink
			to={RoutePaths.main}
			className={cls.link}
		>
			<Text
				className={cls.logo}
				title='News wire'
				titleColor={TextColor.LIGHT}
			/>
		</AppLink>
		{content}
	</header>
})