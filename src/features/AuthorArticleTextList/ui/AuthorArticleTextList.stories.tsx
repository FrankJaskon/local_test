import { Meta, StoryFn } from '@storybook/react'
import { ArticleType } from '@/entities/Article'
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator'
import { getArticlesRoute } from '@/shared/const/RoutPaths'
import { AuthorArticleTextList, AuthorArticleTextListProps } from './AuthorArticleTextList'

const article: ArticleType = {
	id: 1,
	profile: {
		id: 1,
		username: 'admin',
		avatar: 'https://teleprogramma.pro/sites/default/files/nodes/node_436422_1653684561.jpg',
	},
	title: 'Javascript news, Що нового у JS у 2022 році?',
	subtitle: 'Що нового у JS у 2022 році?',
	img: 'https://pbs.twimg.com/media/FMukdWraQAMAuxa.jpg',
	views: 1022,
	createdAt: '26.02.2022',
	type: ['IT', 'ECONOMIC', 'SCIENCE'],
	blocks: [
		{
			id: 1,
			code: 'test test test',
			type: 'CODE',
		},
	],
}

export default {
	title: 'features/AuthorArticleTextList',
	component: AuthorArticleTextList,
	argTypes: {},
	decorators: [StoreDecorator({})],
} as Meta<typeof AuthorArticleTextList>

const Template: StoryFn<typeof AuthorArticleTextList> = (args: any) => (
	<AuthorArticleTextList {...args} />
)

export const Basic: StoryFn<AuthorArticleTextListProps> = Template.bind({})
Basic.parameters = {
	mockData: [
		{
			url: `${__API_URL__}${getArticlesRoute()}?_limit=10&_sort=createdAt&_order=desc net::E`,
			method: 'GET',
			status: 200,
			response: [
				{ ...article },
				{ ...article, id: 2 },
				{ ...article, id: 3 },
				{ ...article, id: 4 },
				{ ...article, id: 5 },
				{ ...article, id: 6 },
				{ ...article, id: 7 },
				{ ...article, id: 8 },
				{ ...article, id: 9 },
			],
		},
	],
}
