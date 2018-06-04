import React from 'react';

import { Layout } from 'antd';

const { Footer } = Layout;

export default class MarkDown extends React.Component {
	render(){
		return(
			<Footer style={{ textAlign: 'center' }}>
			    AkiCloud ©2018 Created by Vladimir Ch.
			</Footer>
		)
	}
}