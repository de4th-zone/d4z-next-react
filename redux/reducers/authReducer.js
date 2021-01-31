import {
	REGISTER_REQUESTED,
	REGISTER_SUCCEED,
	REGISTER_FAILED,
	REGISTER_RESETED,
	LOGIN_REQUESTED,
	LOGIN_SUCCEED,
	LOGIN_FAILED,
	LOGIN_RESETED
} from '../constants/authConstant';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
	register: {
		user: {},
		isLoading: false,
		isError: false,
		errorMessage: {}
	},
	login: {
		isAuthenticated: false,
		user: {},
		isLoading: false,
		isError: false,
		errorMessage: {}
	}
};
const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_REQUESTED:
			return {
				...state,
				register: {
					...state.register,
					isLoading: true
				}
			};
		case REGISTER_SUCCEED:
			return {
				...state,
				register: {
					...state.register,
					user: action.payload,
					isLoading: false
				}
			};
		case REGISTER_FAILED:
			return {
				...state,
				register: {
					...state.register,
					isError: true,
					isLoading: false,
					errorMessage: action.payload
				}
			};
		case REGISTER_RESETED:
			return {
				...state,
				register: {
					...state.register,
					user: {},
					isLoading: false,
					isError: false,
					errorMessage: {}
				}
			};
		//
		case LOGIN_REQUESTED:
			return {
				...state,
				login: {
					...state.login,
					isLoading: true
				}
			};
		case LOGIN_SUCCEED:
			return {
				...state,
				login: {
					...state.login,
					isAuthenticated: action.payload.isAuthenticated,
					user: action.payload.user,
					isLoading: false
				}
			};
		case LOGIN_FAILED:
			return {
				...state,
				login: {
					...state.login,
					isError: true,
					isLoading: false,
					errorMessage: action.payload
				}
			};
		case LOGIN_RESETED: // Logout here
			return {
				...state,
				login: {
					...state.login,
					isAuthenticated: false,
					user: {},
					isLoading: false,
					isError: false,
					errorMessage: {}
				}
			};
		default:
			return state;
	}
};

export default authReducer;
