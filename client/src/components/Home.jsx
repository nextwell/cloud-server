import React from 'react';

import { Layout, Row } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

import SideBar from './SideBar.jsx';
import MainFunctions from './MainFunctions.jsx';
import FilesList from './../containers/files-list.jsx';

import MarkDown from './MarkDown.jsx';



export default class Home extends React.Component{
	render(){
		return (
			<Layout>
				<Header style={{ background: '#fff', padding: 0 }}>
					<MainFunctions />
				</Header>



			    <Content style={{ margin: '24px 16px 0', height: '100%', overflowY: 'auto' }}>
			        <div style={{ padding: 24, background: '#fff', height: '100%', overflow: 'auto' }}>

			        	<Row gutter={12}>

				        	<FilesList />

			        	</Row>

			        	

			        </div>
			    </Content>
			    <MarkDown />
		    </Layout>
		)
	}
}