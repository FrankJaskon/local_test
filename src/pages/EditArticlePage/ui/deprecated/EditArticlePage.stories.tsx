import { Meta, StoryFn } from '@storybook/react'
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator'
import { EditArticlePage } from './EditArticlePage'

export default {
	title: 'deprecated/pages/EditArticlePage',
	component: EditArticlePage,
	argTypes: {},
	args: {},
	decorators: [StoreDecorator({})],
} as Meta<typeof EditArticlePage>

const Template: StoryFn<typeof EditArticlePage> = args => <EditArticlePage {...args} />

export const Basic: StoryFn = Template.bind({})
Basic.args = {}
