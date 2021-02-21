import {
	SINGLE_USER_REQUESTED,
	SINGLE_USER_SUCCEED,
	SINGLE_USER_FAILED,
	SINGLE_USER_RESETED
} from '../constants/userConstant';

const initialState = {
	singleUser: {
		user: {},
		isLoading: true,
		isError: false,
		errorMessage: {}
	}
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SINGLE_USER_REQUESTED:
			return {
				...state,
				singleUser: {
					...state.singleUser,
					isLoading: true
				}
			};
		case SINGLE_USER_SUCCEED:
			return {
				...state,
				singleUser: {
					...state.singleUser,
					user: action.payload,
					isLoading: false
				}
			};
		case SINGLE_USER_FAILED:
			return {
				...state,
				singleUser: {
					...state.singleUser,
					isError: true,
					errorMessage: action.payload
				}
			};
		case SINGLE_USER_RESETED:
			return {
				...state,
				singleUser: {
					...state.singleUser,
					user: {},
					isLoading: true,
					isError: false,
					errorMessage: {}
				}
			};
		default:
			return state;
	}
};

export default userReducer;
