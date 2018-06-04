import React from 'react';

import { Card, Icon, Avatar, Button, Popconfirm, message } from 'antd';
const { Meta } = Card;

import axios from 'axios';



class FileCard extends React.Component {
	constructor(){
		super();
		this.delete = this.delete.bind(this);
	}
	delete(e) {
	    console.log("True");
	    console.log(this.props)
	    axios.get(`/remove/${this.props.id}`)
	    	.then(function(response) { /* idk */ })

	}

	render(){
		let data = this.props;
		let downloadLink = `/download/${data.id}`;
		console.log(data);
		return(
			<Card
			    style={{ width: 150, margin: '0 auto' }}
			    cover={<Icon style={{ fontSize: 40, marginTop: 12 }} type="file" />}
			    actions={[<Button type="primary" href={downloadLink} shape="circle" icon="download"/>, 
			    			<Button shape="circle" icon="share-alt"/>,( 
			    			<Popconfirm title="Удалить этот файл?" onConfirm={this.delete} okText="Удалить" cancelText="Закрыть">
			    				<Button type="danger" shape="circle" icon="delete"/>
			    			</Popconfirm>)]}>
			    <Meta
			      title={data.fileName}
			      description={"Размер: " + (data.fileSize).toFixed(2) + " МБ"}
			    />
			</Card>


		)
	}
}

export { FileCard };