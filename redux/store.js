import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const bindMiddleware = (middleware) => {
	if (process.env.NODE_ENV !== 'production') {
		const { composeWithDevTools } = require('redux-devtools-extension');
		return composeWithDevTools(applyMiddleware(...middleware));
	}
	return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
	if (action.type === HYDRATE) {
		const { categories, posts, tags } = action.payload;
		const { login } = action.payload.auth;
		const nextState = {
			...state,
			auth: {
				...state.auth,
				login
			},
			categories,
			posts,
			tags
		};
		return nextState;
	} else {
		return rootReducer(state, action);
	}
};

/* const composeEnhancers =
	typeof window === 'object' &&
	process.env.NODE_ENV === 'development' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose; */

export const store = () => createStore(reducer, bindMiddleware([thunk]));

export const wrapper = createWrapper(store);
