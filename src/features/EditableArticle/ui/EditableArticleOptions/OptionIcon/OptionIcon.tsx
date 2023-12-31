import { FC } from 'react'
import RemoveIconDeprecated from '@/shared/assets/icons/clear.svg'
import MenuIcon from '@/shared/assets/icons/menu.svg'
import classNames from '@/shared/lib/classNames/classNames'
import { ToggleFeatures } from '@/shared/lib/features'
import { AppCard as AppCardDeprecated, CardVariant } from '@/shared/ui/deprecated/AppCard'
import { AppIcon as AppIconDeprecated, AppIconVariant } from '@/shared/ui/deprecated/AppIcon'
import { AppIcon } from '@/shared/ui/redesigned/AppIcon'
import { HStack } from '@/shared/ui/redesigned/HStack'
import cls from './OptionIcon.module.scss'

export interface OptionIconProps {
	className?: string
	size?: number
}

export const OptionIcon: FC<OptionIconProps> = props => {
	const { className, size = 24 } = props

	return (
		<ToggleFeatures
			feature='isAppRedesigned'
			on={
				<HStack
					justify='center'
					align='center'
					className={classNames(cls.OptionIcon, {}, [className])}
				>
					<AppIcon Svg={MenuIcon} height={size} width={size} />
				</HStack>
			}
			off={
				<AppCardDeprecated variant={CardVariant.PRIMARY} noPaddings className={className}>
					<HStack justify='center' align='center'>
						<AppIconDeprecated
							Svg={RemoveIconDeprecated}
							variant={AppIconVariant.CONTRAST}
						/>
					</HStack>
				</AppCardDeprecated>
			}
		/>
	)
}
