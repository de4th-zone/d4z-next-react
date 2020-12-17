import {
	FETCH_CATEGORY_REQUESTED,
	FETCH_CATEGORY_SUCCEED,
	FETCH_CATEGORY_FAILED,
	FETCH_CATEGORY_RESETED,
	SINGLE_CATEGORY_REQUESTED,
	SINGLE_CATEGORY_SUCCEED,
	SINGLE_CATEGORY_FAILED,
	SINGLE_CATEGORY_RESETED
} from '../constants/categoryConstant';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
	fetchCategory: {
		category: [],
		isLoading: true,
		isError: false,
		errorMessage: {}
	},
	singleCategory: {
		category: {},
		isLoading: true,
		isError: false,
		errorMessage: {}
	}
};

const categoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case HYDRATE:
			const { fetchCategory, singleCategory } = action.payload.categories;
			return {
				...state,
				fetchCategory,
				singleCategory
			};
		case FETCH_CATEGORY_REQUESTED:
			return {
				...state,
				fetchCategory: {
					...state.fetchCategory,
					isLoading: true
				}
			};
		case FETCH_CATEGORY_SUCCEED:
			return {
				...state,
				fetchCategory: {
					...state.fetchCategory,
					category: action.payload,
					isLoading: false
				}
			};
		case FETCH_CATEGORY_FAILED:
			return {
				...state,
				fetchCategory: {
					...state.fetchCategory,
					isError: true,
					errorMessage: action.payload
				}
			};
		case FETCH_CATEGORY_RESETED:
			return {
				...state,
				fetchCategory: {
					...state.fetchCategory,
					category: [],
					isLoading: true,
					isError: false,
					errorMessage: {}
				}
			};
		//
		case SINGLE_CATEGORY_REQUESTED:
			return {
				...state,
				singleCategory: {
					...state.singleCategory,
					isLoading: true
				}
			};
		case SINGLE_CATEGORY_SUCCEED:
			return {
				...state,
				singleCategory: {
					...state.singleCategory,
					category: action.payload,
					isLoading: false
				}
			};
		case SINGLE_CATEGORY_FAILED:
			return {
				...state,
				singleCategory: {
					...state.singleCategory,
					isError: true,
					errorMessage: action.payload
				}
			};
		case SINGLE_CATEGORY_RESETED:
			return {
				...state,
				singleCategory: {
					...state.singleCategory,
					category: [],
					isLoading: true,
					isError: false,
					errorMessage: {}
				}
			};
		default:
			return state;
	}
};

export default categoryReducer;
