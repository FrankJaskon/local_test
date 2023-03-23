import { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import { LinkProps } from 'react-router-dom'
import { ValueOf } from 'shared/config/types/types'
import classNames from 'shared/lib/classNames/classNames'
import cls from './AppLink.module.scss'

export const AppLinkVariant = {
	PRIMARY: 'primary',
	SECONDARY: 'secondary',
	UNDERLINED: 'underlined',
} as const

export type AppLinkVariantType = ValueOf<typeof AppLinkVariant>

export type AppLinkProps = Omit<LinkProps, 'to'> & {
	className?: string
    variant?: AppLinkVariantType
	to?: string
}

export const AppLink: FC<AppLinkProps> = memo((props: AppLinkProps) => {
	const {
		to = '#',
		children,
		className,
		variant = AppLinkVariant.SECONDARY,
		...otherProps } = props

	return <Link
		to={to}
		className={classNames(cls.AppLink, {}, [className, cls[variant]])}
		{...otherProps}>
		{ children }
	</Link>
})