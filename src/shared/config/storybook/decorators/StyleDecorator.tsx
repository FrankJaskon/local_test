import { Story } from '@storybook/react'
import '@/app/styles/index.scss'

export const StyleDecorator = (StoryComponent: Story) => (
	<div className='App'>
		<StoryComponent />
	</div>
)
