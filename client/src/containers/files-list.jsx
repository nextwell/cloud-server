import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { Col } from 'antd';

import FileCard from '../components/FileCard.jsx';

class FilesList extends React.Component {
	showList(){
		let arr = this.props.files.data;
		if ( arr.length == 0){
			return <div className="empty-text">Здесь пока пусто!</div>
		}
		else {
			return this.props.files.data.map ((file) => {
				return (
					<Col key={file.id} className='gutter-row' style={{marginBottom: 10}} xxl={3} xl={4} lg={6} md={6} sm={12}>
						<FileCard fileName={file.name} fileSize={file.size/1024/1024} id={file._id} key={file._id} />
					</Col>
				)
			})
		}
		
	}
	render(){
		return (
			<div>
				{this.showList()}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		files: state.files
	};
}

export default connect(mapStateToProps)(FilesList);