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
		const nextState = {
			...state, // use previous state
			...action.payload // apply delta from hydration
		};
		//if (state.posts.posts) nextState.posts.posts = state.posts.posts; // preserve count value on client side navigation
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
