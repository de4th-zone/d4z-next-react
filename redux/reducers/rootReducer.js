import { combineReducers } from 'redux';
import postReducer from './postReducer';
import categoryReducer from './categoryReducer';
import tagReducer from './tagReducer';

const rootReducer = combineReducers({
	posts: postReducer,
	categories: categoryReducer,
	tags: tagReducer
});

export default rootReducer;
