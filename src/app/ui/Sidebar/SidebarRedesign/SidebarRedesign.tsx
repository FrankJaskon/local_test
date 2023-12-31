import { FloatingDelayGroup } from '@floating-ui/react'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { LanguageToggler } from '@/features/LanguageToggler'
import { ThemeToggler } from '@/features/ThemeToggler'
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg'
import { TooltipDelay } from '@/shared/const/consts'
import { useDetectMobile } from '@/shared/hooks/useDetectMobile/useDetectMobile'
import classNames from '@/shared/lib/classNames/classNames'
import { AppIcon } from '@/shared/ui/redesigned/AppIcon'
import { AppLogo } from '@/shared/ui/redesigned/AppLogo'
import { HStack } from '@/shared/ui/redesigned/HStack'
import { VStack } from '@/shared/ui/redesigned/VStack'
import { getSidebarItem } from '../model/selectors/getSidebarItem'
import { SidebarLink } from '../SidebarLink/SidebarLink'
import cls from './SidebarRedesign.module.scss'

interface SidebarRedesignProps {
	className?: string
}

export const SidebarRedesign: FC<SidebarRedesignProps> = memo((props: SidebarRedesignProps) => {
	const { className } = props
	const isMobile = useDetectMobile()
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
	const sidebarLinks = useSelector(getSidebarItem)

	const toggleSidebar = () => {
		setIsCollapsed(prev => !prev)
	}

	useEffect(() => {
		isMobile && setIsCollapsed(true)
	}, [isMobile])

	const renderLinks = useMemo(() => {
		return sidebarLinks.map(item => {
			return <SidebarLink key={item.path} item={item} collapsed={isCollapsed} />
		})
	}, [isCollapsed, sidebarLinks])

	return (
		<aside
			data-testid='sidebar'
			className={classNames(cls.Sidebar, { [cls.collapsed]: isCollapsed }, [className])}
		>
			<VStack
				align={isCollapsed ? 'center' : 'start'}
				className={cls.menu}
				innerWidth={isCollapsed ? undefined : 'full'}
			>
				<AppLogo className={cls.appLogo} size={isCollapsed ? 30 : 70} />
				{renderLinks}
			</VStack>
			{isCollapsed ? (
				<VStack justify='center' align='center' className={cls.buttonGroup}>
					<ThemeToggler className={cls.themeToggler} />
					<LanguageToggler
						className={classNames(cls.languageToggler, {
							[cls.collapsed]: isCollapsed,
						})}
						short={isCollapsed}
					/>
				</VStack>
			) : (
				<FloatingDelayGroup delay={TooltipDelay}>
					<HStack justify='center' align='center' className={cls.buttonGroup}>
						<ThemeToggler className={cls.themeToggler} />
						<LanguageToggler
							className={classNames(cls.languageToggler, {
								[cls.collapsed]: isCollapsed,
							})}
							short={isCollapsed}
						/>
					</HStack>
				</FloatingDelayGroup>
			)}
			<AppIcon
				data-testid='sidebar-toggler'
				className={classNames(cls.sidebarToggler, { [cls.collapsed]: isCollapsed })}
				onClick={toggleSidebar}
				Svg={ArrowIcon}
				clickable
			/>
		</aside>
	)
})
