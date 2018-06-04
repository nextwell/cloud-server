import React from 'react';

import { Layout, Menu, Header, Content, Row, Footer } from 'antd';

import { MainFunctions } from '../components/MainFunctions.jsx';
import FilesList from '../containers/files-list.jsx';




export default class Files extends React.Component {
	render(){
		return(
			<Layout>
				<Header style={{ background: '#fff', padding: 0 }}>
					<MainFunctions />
				</Header>
 


			    <Content style={{ margin: '24px 16px 0', height: 'auto', overflowY: 'auto' }}>
			        <div style={{ padding: 24, background: '#fff', height: '100%' }}>

			        	<Row gutter={12}>

				        	<FilesList />

			        	</Row>

			        	

			        </div>
			    </Content>
			    <Footer style={{ textAlign: 'center' }}>
			        AkiCloud ©2018 Created by Vladimir Ch.
			    </Footer>
			</Layout>
		)
	}
}