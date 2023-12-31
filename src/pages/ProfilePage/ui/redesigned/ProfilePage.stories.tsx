import { Meta, StoryFn } from '@storybook/react'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator'
import { ProfilePage } from './ProfilePage'

const data = {
	age: '1',
	city: 'Test',
	id: 1,
	firstname: 'User',
	lastname: 'Test',
	username: 'Test user',
	currency: Currency.UAH,
	country: Country.UKRAINE,
}

export default {
	title: 'pages/ProfilePage',
	component: ProfilePage,
	argTypes: {},
	decorators: [
		StoreDecorator({
			profile: {
				isLoading: false,
				data: data,
				form: data,
			},
			user: {
				authData: {
					id: 1,
				},
			},
		}),
	],
} as Meta<typeof ProfilePage>

const Template: StoryFn<typeof ProfilePage> = args => <ProfilePage {...args} />

export const Basic: StoryFn = Template.bind({})
