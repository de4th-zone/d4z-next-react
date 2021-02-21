import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import postReducer from './postReducer';
import categoryReducer from './categoryReducer';
import tagReducer from './tagReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	users: userReducer,
	posts: postReducer,
	categories: categoryReducer,
	tags: tagReducer
});

export default rootReducer;
