import { ComponentStory, ComponentMeta, Story } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecotator'
import { AppLabel, AppLabelProps } from './AppLabel'

export default {
	title: 'shared/Form/AppLabel',
	component: AppLabel,
	args: {
		children: 'Test'
	}
} as ComponentMeta<typeof AppLabel>

const Template: ComponentStory<typeof AppLabel> = (args) => <AppLabel {...args} />

export const Basic: Story<AppLabelProps> = Template.bind({})
Basic.args = {

}

export const BasicDark: Story<AppLabelProps> = Template.bind({})
BasicDark.args = {
}
BasicDark.decorators = [ThemeDecorator('dark')]

export const BasicPurple: Story<AppLabelProps> = Template.bind({})
BasicPurple.args = {
}
BasicPurple.decorators = [ThemeDecorator('purple')]