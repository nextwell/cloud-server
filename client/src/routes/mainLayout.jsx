import React from 'react';

import { Link } from 'react-router';

import { Layout } from 'antd';

import { SideBar } from '../components/SideBar.jsx';



export default class MainLayout extends React.Component{
  render() {
    return (
        <Layout>
            <Sider  breakpoint="lg"
                    collapsedWidth="0"
                    onCollapse={(collapsed, type) => { console.log(collapsed, type); }}>
                <SideBar />
            </Sider>
            {this.props.children}
        </Layout>
       
      )
  }
}