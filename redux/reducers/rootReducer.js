import { combineReducers } from 'redux';
import postReducer from './postReducer';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
	posts: postReducer,
	categories: categoryReducer
});

export default rootReducer;
