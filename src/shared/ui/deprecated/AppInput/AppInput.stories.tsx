import { Meta, StoryFn } from '@storybook/react'
import { AppInput, AppInputProps, InputColor, InputVariant } from './AppInput'

export default {
	title: 'deprecated/shared/Form/AppInput',
	component: AppInput,
	args: {
		value: 'Test',
	},
} as Meta<typeof AppInput>

const Template: StoryFn<typeof AppInput> = args => <AppInput {...args} />

export const Basic: StoryFn<AppInputProps> = Template.bind({})
Basic.args = {}

export const Clear: StoryFn<AppInputProps> = Template.bind({})
Clear.args = {
	variant: InputVariant.CLEAR,
}

export const BasicPrimary: StoryFn<AppInputProps> = Template.bind({})
BasicPrimary.args = {
	color: InputColor.PRIMARY,
}

export const BasicSecondary: StoryFn<AppInputProps> = Template.bind({})
BasicSecondary.args = {
	color: InputColor.SECONDARY,
}

export const BasicReadonly: StoryFn<AppInputProps> = Template.bind({})
BasicReadonly.args = {
	readonly: true,
}
