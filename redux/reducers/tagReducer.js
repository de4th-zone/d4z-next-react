import {
	FETCH_TAG_REQUESTED,
	FETCH_TAG_SUCCEED,
	FETCH_TAG_FAILED,
	FETCH_TAG_RESETED,
	SINGLE_TAG_REQUESTED,
	SINGLE_TAG_SUCCEED,
	SINGLE_TAG_FAILED,
	SINGLE_TAG_RESETED
} from '../constants/tagConstant';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
	fetchTag: {
		tag: [],
		isLoading: true,
		isError: false,
		errorMessage: {}
	},
	singleTag: {
		tag: {},
		isLoading: true,
		isError: false,
		errorMessage: {}
	}
};

const tagReducer = (state = initialState, action) => {
	switch (action.type) {
		case HYDRATE:
			const { fetchTag, singleTag } = action.payload.tags;
			return {
				...state,
				fetchTag,
				singleTag
			};
		case FETCH_TAG_REQUESTED:
			return {
				...state,
				fetchTag: {
					...state.fetchTag,
					isLoading: true
				}
			};
		case FETCH_TAG_SUCCEED:
			return {
				...state,
				fetchTag: {
					...state.fetchTag,
					tag: action.payload,
					isLoading: false
				}
			};
		case FETCH_TAG_FAILED:
			return {
				...state,
				fetchTag: {
					...state.fetchTag,
					isError: true,
					errorMessage: action.payload
				}
			};
		case FETCH_TAG_RESETED:
			return {
				...state,
				fetchTag: {
					...state.fetchTag,
					tag: [],
					isLoading: true,
					isError: false,
					errorMessage: {}
				}
			};
		//
		case SINGLE_TAG_REQUESTED:
			return {
				...state,
				singleTag: {
					...state.singleTag,
					isLoading: true
				}
			};
		case SINGLE_TAG_SUCCEED:
			return {
				...state,
				singleTag: {
					...state.singleTag,
					tag: action.payload,
					isLoading: false
				}
			};
		case SINGLE_TAG_FAILED:
			return {
				...state,
				singleTag: {
					...state.singleTag,
					isError: true,
					errorMessage: action.payload
				}
			};
		case SINGLE_TAG_RESETED:
			return {
				...state,
				singleTag: {
					...state.singleTag,
					tag: {},
					isLoading: true,
					isError: false,
					errorMessage: {}
				}
			};
		default:
			return state;
	}
};

export default tagReducer;
