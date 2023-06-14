import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	ArticleTopicType,
	BlockType,
	CodeBlockType,
	EditableTextBlockType,
} from '@/entities/Article'
import { EditableImageBlockType } from '@/entities/Article/model/types/Article'
import { randomInteger } from '@/shared/lib/randomInteger/randomInteger'
import { mapArticleToEditableArticle } from '../helpers/mapArticleToEditableArticle'
import { createNewArticle } from '../services/createNewArticle'
import { initEditableArticle } from '../services/initEditableArticle'
import { removeArticle } from '../services/removeArticle'
import { updateArticle } from '../services/updateArticle'
import {
	EditableArticleScheme,
	EditableArticleType,
	InsertDirectionType,
	ViewMode,
} from '../types/editableArticleScheme'

const initialState: EditableArticleScheme = {
	error: undefined,
	isLoading: false,
	mode: 'edit',
	data: {},
	form: {
		id: undefined,
		title: undefined,
		subtitle: undefined,
		createdAt: undefined,
		img: undefined,
		type: undefined,
		views: undefined,
		blocks: [],
		isSubtitle: false,
		isImg: false,
	},
	isReducerMounted: true,
	isEdit: false,
}

export interface SetTextBlockParagraphProps {
	blockId: number
	paragraphId: number
	value?: string
}

const editableArticleSlice = createSlice({
	name: 'editableArticleSlice',
	initialState,
	reducers: {
		setMode: (state, action: PayloadAction<ViewMode>) => {
			state.mode = action.payload
		},
		setArticleData: (state, action: PayloadAction<EditableArticleType>) => {
			state.form = {
				...state.form,
				...action.payload,
			}
		},
		resetChanges: state => {
			state.form = mapArticleToEditableArticle(state.data)
		},
		setArticleType: (state, action: PayloadAction<ArticleTopicType>) => {
			if (!state.form.type) {
				state.form.type = []
			}
			const isAlreadyActive = state.form.type.includes(action.payload)
			if (isAlreadyActive) {
				state.form.type = state.form.type.filter(type => type !== action.payload)
			} else {
				state.form.type = [...state.form.type, action.payload]
			}
		},
		removeBlock: (state, action: PayloadAction<number>) => {
			state.form.blocks = state.form.blocks!.filter(block => block.id !== action.payload)
		},
		addNewTextBlock: (
			state,
			action: PayloadAction<{ to: InsertDirectionType; id?: number }>
		) => {
			const newBlock = {
				id: randomInteger(),
				type: BlockType.TEXT,
				paragraphs: [
					{
						id: randomInteger(),
					},
				],
			}
			if (!action.payload.id) {
				if (action.payload.to === 'start') {
					state.form.blocks = [newBlock, ...state.form.blocks!]
					return
				}
				if (action.payload.to === 'end') {
					state.form.blocks = [...state.form.blocks!, newBlock]
				}
			}
		},
		setTextBlock: (state, action: PayloadAction<EditableTextBlockType>) => {
			state.form.blocks = state.form.blocks!.map(block => {
				if (block.id === action.payload.id && block.type === BlockType.TEXT) {
					return {
						...block,
						...action.payload,
					}
				}
				return block
			})
		},
		setTextBlockParagraph: (state, action: PayloadAction<SetTextBlockParagraphProps>) => {
			let isExisted = false
			const newFormBlocks = state.form.blocks!.map(block => {
				if (block.id === action.payload.blockId && block.type === BlockType.TEXT) {
					const newParagraphs = block.paragraphs!.map(paragraph => {
						if (paragraph.id === action.payload.paragraphId) {
							isExisted = true
							return {
								...paragraph,
								value: action.payload.value,
							}
						}
						return paragraph
					})
					return {
						...block,
						paragraphs: isExisted
							? newParagraphs
							: [
									...newParagraphs,
									{ id: action.payload.paragraphId, value: action.payload.value },
							  ],
					}
				}
				return block
			})
			state.form.blocks = newFormBlocks
		},
		removeTextBlockParagraph: (state, action: PayloadAction<SetTextBlockParagraphProps>) => {
			const newFormBlocks = state.form.blocks!.map(block => {
				if (block.id === action.payload.blockId && block.type === BlockType.TEXT) {
					const newParagraphs = block.paragraphs!.filter(
						paragraph => paragraph.id !== action.payload.paragraphId
					)
					return {
						...block,
						paragraphs: newParagraphs,
					}
				}
				return block
			})
			state.form.blocks = newFormBlocks
		},
		addNewCodeBlock: (
			state,
			action: PayloadAction<{ to: InsertDirectionType; id?: number }>
		) => {
			const newBlock = {
				id: randomInteger(),
				type: BlockType.CODE,
				code: '',
			}
			if (!action.payload.id) {
				if (action.payload.to === 'start') {
					state.form.blocks = [newBlock, ...state.form.blocks!]
					return
				}
				if (action.payload.to === 'end') {
					state.form.blocks = [...state.form.blocks!, newBlock]
				}
			}
		},
		setCodeBlock: (state, action: PayloadAction<CodeBlockType>) => {
			state.form.blocks = state.form.blocks!.map(block => {
				if (block.id === action.payload.id && block.type === BlockType.CODE) {
					return {
						...block,
						...action.payload,
					}
				}
				return block
			})
		},
		addNewImageBlock: (
			state,
			action: PayloadAction<{ to: InsertDirectionType; id?: number }>
		) => {
			const newBlock = {
				id: randomInteger(),
				type: BlockType.IMAGE,
				src: '',
				title: '',
			}
			if (!action.payload.id) {
				if (action.payload.to === 'start') {
					state.form.blocks = [newBlock, ...state.form.blocks!]
					return
				}
				if (action.payload.to === 'end') {
					state.form.blocks = [...state.form.blocks!, newBlock]
				}
			}
		},
		setImageBlock: (state, action: PayloadAction<EditableImageBlockType>) => {
			state.form.blocks = state.form.blocks!.map(block => {
				if (block.id === action.payload.id && block.type === BlockType.IMAGE) {
					return {
						...block,
						...action.payload,
					}
				}
				return block
			})
		},
	},
	extraReducers: builder => {
		// initEditableArticle
		builder.addCase(initEditableArticle.pending, state => {
			state.error = undefined
			state.isLoading = true
			state.isEdit = true
		})
		builder.addCase(initEditableArticle.fulfilled, (state, { payload }) => {
			state.isLoading = false
			state.data = payload.data
			state.form = payload.form
		})
		builder.addCase(initEditableArticle.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.payload
		})
		// createNewArticle
		builder.addCase(createNewArticle.pending, state => {
			state.error = undefined
			state.isLoading = true
		})
		builder.addCase(createNewArticle.fulfilled, state => {
			state.isLoading = false
			state.isFinished = true
		})
		builder.addCase(createNewArticle.rejected, (state, action) => {
			state.isLoading = false
			state.isFinished = true
			state.error = action.payload
		})
		// updateArticle
		builder.addCase(updateArticle.pending, state => {
			state.error = undefined
			state.isLoading = true
		})
		builder.addCase(updateArticle.fulfilled, state => {
			state.isLoading = false
			state.isFinished = true
		})
		builder.addCase(updateArticle.rejected, (state, action) => {
			state.isLoading = false
			state.isFinished = true
			state.error = action.payload
		})
		// removeArticle
		builder.addCase(removeArticle.pending, state => {
			state.error = undefined
			state.isLoading = true
		})
		builder.addCase(removeArticle.fulfilled, state => {
			state.isLoading = false
			state.isFinished = true
			state.form = {}
			state.data = {}
		})
		builder.addCase(removeArticle.rejected, (state, action) => {
			state.isLoading = false
			state.isFinished = true
			state.error = action.payload
		})
	},
})

export const { actions: editableArticleActions } = editableArticleSlice
export const { reducer: editableArticleReducer } = editableArticleSlice