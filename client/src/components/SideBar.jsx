import React from 'react';

import { Menu, Icon, Button } from 'antd';

import { Link } from 'react-router-dom';

export default class SideBar extends React.Component {

    render() {
        return (
            <Menu
            mode="inline"
            style={{ height: "100%" }}
            defaultSelectedKeys={['1']}>

                <Menu.Item key="1">
                    <Link to='/home'>
                        <Icon type="home" />
                        Все файлы
                    </Link>
                </Menu.Item>
             
                <Menu.Item key="2">
                    <Link to='/settings'>
                        <Icon type="setting" />
                        Настройки
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Button icon="logout" href="/logout">Выйти</Button>
                </Menu.Item>
            </Menu>
        );
    }
}