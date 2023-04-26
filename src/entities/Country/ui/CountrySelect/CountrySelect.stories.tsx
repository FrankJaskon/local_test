import { ComponentStory, ComponentMeta, Story } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator'
import { AppThemes } from '@/shared/config/theme/ThemeContext'
import { Country } from '../../model/consts/country'
import { CountrySelect } from './CountrySelect'

export default {
	title: 'entities/CountrySelect',
	component: CountrySelect,
	argTypes: {},
	args: {
		value: Country.UKRAINE
	},
	decorators: []
} as ComponentMeta<typeof CountrySelect>

const Template: ComponentStory<typeof CountrySelect> = (args) => <CountrySelect {...args} />

export const Basic: Story = Template.bind({})
Basic.args = {

}

export const DarkTheme: Story = Template.bind({})
DarkTheme.args = {
}
DarkTheme.decorators = [ThemeDecorator(AppThemes.DARK)]

export const PurpleTheme: Story = Template.bind({})
PurpleTheme.args = {
}
PurpleTheme.decorators = [ThemeDecorator(AppThemes.PURPLE)]