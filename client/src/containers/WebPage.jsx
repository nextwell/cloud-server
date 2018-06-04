import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Layout, Menu, Icon, Row, Col } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

import { BrowserRouter as Router, Route } from 'react-router-dom';


import Home from './../components/Home.jsx';
import SideBar from './../components/SideBar.jsx';

import MarkDown from './../components/MarkDown.jsx';

import Settings from './../components/Settings.jsx';



class WebPage extends React.Component {
	test(){
		console.log(this.props.config);
	}
	render(){
		return(
			<Router>
				<Layout style={{height: '100%'}}>
					<Sider  breakpoint="lg"
	      					collapsedWidth="0"
	      					onCollapse={(collapsed, type) => { console.log(collapsed, type); }}>
						<SideBar />
					</Sider>
					<Route exact path='/home' component={Home} />
					<Route path='/settings' component={Settings} />
				</Layout>
			</Router>
		)
	}
}

function mapStateToProps(state) {
	return {
		config: state.config,
		files: state.files,
		user: state.user
	};
}

export default connect(mapStateToProps)(WebPage);