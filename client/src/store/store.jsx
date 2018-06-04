import {createStore, applyMiddleware, compose} from 'redux';

import AllReducers from './reducers/index.jsx';


import thunk from 'redux-thunk';

const store = createStore(AllReducers, applyMiddleware(thunk));

export { store };