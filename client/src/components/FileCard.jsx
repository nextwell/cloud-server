import React from 'react';

import { connect } from 'react-redux';

import * as types from './../actions/actionTypes.jsx';

import {store} from './../store/store.jsx';



import { Card, Icon, Avatar, Button, Popconfirm, message, Modal } from 'antd';
const { Meta } = Card;

import axios from 'axios';



class FileCard extends React.Component {
	constructor(props, context){
		super(props, context)
		this.delete = this.delete.bind(this);
		this.share = this.share.bind(this);
	}
	delete(e) {
	    axios.get(`/remove/${this.props.id}`)
	    	.then(function(response) { /* idk */ })

	    store.dispatch({type: types.DELETE_FILE, data: this.props.id})
	    
	}
	share(){
		axios.get(`/api/share/${this.props.id}`)
			.then(msg => {
				let data = msg.data;
				if( data.type == 'error' ){
					console.log(data.error);
					Modal.error({
					    title: 'Ошибка',
					    content: 'Произошла ошибка, попробуйте позже!',
					});
				}
				else {
					let url = document.location.origin;
					Modal.success({
					    title: 'Готово, файл доступен по этой ссылке!',
					    content: url + data.link,
				    });
				}
			})
		
	}

	render(){
		let data = this.props;
		let downloadLink = `/download/${data.id}`;
		console.log(data);
		return(
			<Card
				hoverable={true}
			    style={{ width: 150, margin: '0 auto' }}
			    cover={<Icon style={{ fontSize: 40, marginTop: 12 }} type="file" />}
			    actions={[<Button type="primary" href={downloadLink} shape="circle" icon="download"/>,
			    			(<Popconfirm title="Поделиться файлом?" onConfirm={this.share} okText="Да" cancelText="Нет">
			    				<Button shape="circle" icon="share-alt" />
			    			</Popconfirm>),
			    			(<Popconfirm title="Удалить этот файл?" onConfirm={this.delete} okText="Удалить" cancelText="Закрыть">
			    				<Button type="danger" shape="circle" icon="delete"/>
			    			</Popconfirm>)]}>
			    <Meta
			      title={data.fileName}
			      description={"Размер: " + (data.fileSize).toFixed(2) + " МБ"}
			      style={{fontSize: 11}}
			    />
			</Card>


		)
	}
}

export default connect()(FileCard);