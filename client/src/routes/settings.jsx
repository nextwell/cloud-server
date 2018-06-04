import React from 'react';

import { Content, Layout, Header } from 'antd';

export default class Settings extends React.Component {
	render(){
		return ( 
			<Layout>
				<Content style={{ margin: '24px 16px 0', height: 'auto', overflowY: 'auto' }}>
			        <div style={{ padding: 24, background: '#fff', height: '100%' }}>
			        	Страница настроек
			        </div>
			    </Content>
			    <Footer style={{ textAlign: 'center' }}>
			        AkiCloud ©2018 Created by Vladimir Ch.
			    </Footer>
		    </Layout>
		)
	}
}