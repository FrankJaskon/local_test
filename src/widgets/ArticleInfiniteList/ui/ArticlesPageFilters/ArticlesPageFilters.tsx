import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { ArticleTypeTabs, ArticlesTypesType } from '@/entities/ArticleTypeTabs'
import { SortSelector, SortVariantType } from '@/entities/SortSelector'
import { QueryParamsKeys } from '@/shared/const/queryParams'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch'
import { useDebounce } from '@/shared/hooks/useDebounce/useDebounce'
import { useInitialEffect } from '@/shared/hooks/useInitialEffect/useInitialEffect'
import classNames from '@/shared/lib/classNames/classNames'
import { setQueryParams } from '@/shared/lib/setQueryParams/setQueryParams'
import { SortOrderType } from '@/shared/types/types'
import { AppInput } from '@/shared/ui/deprecated/AppInput'
import { HStack } from '@/shared/ui/redesigned/HStack'
import { VStack } from '@/shared/ui/redesigned/VStack'
import {
	useArticleInfiniteListFilter,
	useArticleInfiniteListOrder,
	useArticleInfiniteListSearch,
	useArticleInfiniteListSort,
} from '../../model/selectors/articleInfiniteListSelector'
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import { articlesInfiniteListActions } from '../../model/slice/articlesInfiniteListSlice'
import { ArticleViewTogglerContainer } from '../ArticleViewTogglerContainer/ArticleViewTogglerContainer'
import cls from './ArticlesPageFilters.module.scss'

export interface ArticlesPageFiltersProps {
	className?: string
	isReducerMounted?: boolean
	'data-testid'?: string
}

export const ArticlesPageFilters: FC<ArticlesPageFiltersProps> = memo(
	(props: ArticlesPageFiltersProps) => {
		const { className, isReducerMounted, 'data-testid': dataTestId = 'articles-filter' } = props
		const { t } = useTranslation('article')
		const dispatch = useAppDispatch()
		const [searchParams, setSearchParams] = useSearchParams()
		const filter = useArticleInfiniteListFilter()
		const order = useArticleInfiniteListOrder()
		const search = useArticleInfiniteListSearch()
		const sort = useArticleInfiniteListSort()

		useInitialEffect(() => {
			if (isReducerMounted) {
				dispatch(initArticlesPage(searchParams))
			}
		}, [isReducerMounted])

		const setFirstPage = useCallback(() => {
			dispatch(articlesInfiniteListActions.setPage(1))
		}, [dispatch])

		const fetchArticles = useCallback(() => {
			dispatch(fetchArticlesList({ replace: true }))
		}, [dispatch])

		const debouncedFetchArticles = useDebounce(fetchArticles, 500)

		const changeSort = useCallback(
			(value: SortVariantType) => {
				dispatch(articlesInfiniteListActions.setSort(value))
				setQueryParams(setSearchParams, QueryParamsKeys.SORT, value)
				setFirstPage()
				fetchArticles()
			},
			[dispatch, setFirstPage, fetchArticles, setSearchParams]
		)

		const changeOrder = useCallback(
			(value: SortOrderType) => {
				dispatch(articlesInfiniteListActions.setOrder(value))
				setQueryParams(setSearchParams, QueryParamsKeys.ORDER, value)
				setFirstPage()
				fetchArticles()
			},
			[dispatch, setFirstPage, fetchArticles, setSearchParams]
		)

		const changeSearch = useCallback(
			(value: string) => {
				dispatch(articlesInfiniteListActions.setSearch(value))
				setQueryParams(setSearchParams, QueryParamsKeys.SEARCH, value)
				setFirstPage()
				debouncedFetchArticles()
			},
			[dispatch, setFirstPage, debouncedFetchArticles, setSearchParams]
		)

		const changeFilter = useCallback(
			(value: string) => {
				dispatch(articlesInfiniteListActions.setFilter(value as ArticlesTypesType))
				setQueryParams(setSearchParams, QueryParamsKeys.TYPE, value)
				setFirstPage()
				fetchArticles()
			},
			[dispatch, setFirstPage, fetchArticles, setSearchParams]
		)

		return (
			<VStack className={classNames('', {}, [className])} gap='8'>
				<HStack justify='between'>
					<SortSelector
						order={order}
						sort={sort}
						onChangeOrder={changeOrder}
						onChangeSort={changeSort}
					/>
					<ArticleViewTogglerContainer />
				</HStack>
				<AppInput
					className={cls.searchInput}
					placeholder={t('search-input-placeholder')}
					value={search}
					onChange={changeSearch}
					data-testid={`${dataTestId}-search`}
				/>
				<ArticleTypeTabs filter={filter} onTabClick={changeFilter} />
			</VStack>
		)
	}
)
