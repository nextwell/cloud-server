import * as types from './../../actions/actionTypes.jsx';


function fileReducer(state = {
	isLoading: false,
	data: [],
	error: false}
, action = null) {
	switch(action.type) {
		case types.RECV_ERROR:
			return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
		case types.RECV_DATA:
			return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
		case types.REQ_DATA:
			return Object.assign({}, state, {isLoading: true, error: false });
		case types.DELETE_FILE: {
			const fileId = action.data;
  			let updatedData = state.data.filter(file => file._id !== fileId);

			return Object.assign({}, state, {isLoading: true, data: updatedData, error: false });
		}
		default:
			return state;
	}
};


export default fileReducer;