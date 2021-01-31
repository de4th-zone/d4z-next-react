import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer';
import categoryReducer from './categoryReducer';
import tagReducer from './tagReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	posts: postReducer,
	categories: categoryReducer,
	tags: tagReducer
});

export default rootReducer;
