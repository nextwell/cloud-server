import {combineReducers} from 'redux';
import ConfigReducers from './config.jsx';
import UserReducers from './user.jsx';
import FilesReducers from './files.jsx';

const allReducers = combineReducers ({
	user: UserReducers,
	files: FilesReducers,
	config: ConfigReducers
})

export default allReducers;