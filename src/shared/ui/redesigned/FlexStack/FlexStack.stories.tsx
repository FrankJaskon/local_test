import { Meta, StoryFn } from '@storybook/react'
import { FlexStack, FlexStackProps } from './FlexStack'

export default {
	title: 'shared/FlexStack',
	component: FlexStack,
	args: {
		children: (
			<>
				<div>1</div>
				<div>2</div>
				<div>3</div>
				<div>4</div>
				<div>5</div>
				<div>6</div>
			</>
		),
	},
} as Meta<typeof FlexStack>

const Template: StoryFn<typeof FlexStack> = args => <FlexStack {...args} />

export const Basic: StoryFn<FlexStackProps> = Template.bind({})
Basic.args = {}
