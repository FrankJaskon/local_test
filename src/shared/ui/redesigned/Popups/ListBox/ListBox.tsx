import { Listbox as HListBox } from '@headlessui/react'
import { Fragment, ReactNode, useMemo } from 'react'
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg'
import classNames from '@/shared/lib/classNames/classNames'
import { DropdownDirection } from '@/shared/types/ui'
import { AppButton } from '../../AppButton'
import { AppIcon } from '../../AppIcon'
import { HStack } from '../../HStack'
import { mapDirectionClass } from '../styles/consts'
import popupCls from '../styles/popup.module.scss'
import cls from './ListBox.module.scss'

export interface ListBoxItem {
	value: string
	content: ReactNode
	disabled?: boolean
}

interface ListBoxProps {
	items?: ListBoxItem[]
	className?: string
	value?: string
	defaultValue?: string
	onChange: (value: string) => void
	readonly?: boolean
	direction?: DropdownDirection
	label?: string
}

export function ListBox(props: ListBoxProps) {
	const {
		className,
		items,
		value = '',
		defaultValue,
		onChange,
		readonly,
		direction = 'bottom right',
		label,
	} = props

	const optionsClasses = [mapDirectionClass[direction], popupCls.menu]

	const selectedItem = useMemo(() => items?.find(item => item.value === value), [items, value])

	return (
		<HStack gap='4'>
			{label && <span>{`${label}>`}</span>}
			<HListBox
				disabled={readonly}
				as='div'
				className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
				value={value}
				onChange={onChange}
			>
				<HListBox.Button className={cls.trigger} as='div'>
					<AppButton
						variant='filled'
						disabled={readonly}
						addonRight={<AppIcon Svg={ArrowIcon} />}
					>
						{selectedItem?.content ?? defaultValue}
					</AppButton>
				</HListBox.Button>
				<HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
					{items?.map(item => (
						<HListBox.Option
							key={item.value}
							value={item.value}
							disabled={item.disabled}
							as={Fragment}
						>
							{({ active, selected }) => (
								<li
									className={classNames(cls.item, {
										[popupCls.active]: active,
										[popupCls.disabled]: item.disabled,
										[popupCls.selected]: selected,
									})}
								>
									{item.content}
								</li>
							)}
						</HListBox.Option>
					))}
				</HListBox.Options>
			</HListBox>
		</HStack>
	)
}
