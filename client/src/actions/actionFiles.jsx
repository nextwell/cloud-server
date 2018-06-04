import * as types from './actionTypes.jsx';
import axios from 'axios';

function requestData() {
	return {type: types.REQ_DATA}
};

function receiveData(json) {
	return{
		type: types.RECV_DATA,
		data: json
	}
};

function receiveError(json) {
	return {
		type: types.RECV_ERROR,
		data: json
	}
};

export function fetchFiles(url) {
	return function(dispatch) {
		dispatch(requestData());
		return axios.get(url)
			.then(function(response) {
				dispatch(receiveData(response.data));
			})
			.catch(function(response){
				dispatch(receiveError(response.data));
			})
	}
};