import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import './layout.css';

import { Route, Router } from 'dva/router';
import { useHistory, useSelector } from 'dva';



import { MenuInfo } from 'rc-menu/lib/interface';
import { IGlobalState } from '../model/type';
import useLayout from './layout.hooks';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const history = useHistory();

    // 拿到当前有权限的菜单
    const { currentMenus } = useLayout();

    // 路由动态渲染
    const routerRender = (menuArr = currentMenus) => {
        menuArr.map(item => (
            <Route component={item.component} path={item.key + ''}>
                {item.children && routerRender(item.children)}
            </Route>
        ))
    }

    // 获取到 globalState 里面的 rules ，根据不同角色显示不同菜单
    const globalState = useSelector<{ global: IGlobalState }, IGlobalState>(({ global }) => global);

    // 实现路由点击跳转
    const linkPage = ({ key }: MenuInfo) => {
        // 这个key就是在 menus 中设置的 key
        // 设置的就是 key 和 route 中的 path 是一样的
        history.push(key);
    }

    // 退出登陆
    const logout = () => {
        // 清除token
        // token 存到了 dva 里面，并且 dva 做了持久化，存到了 localstorage 里面，
        // 所以退出登陆的时候，只需要清空一下 localstorage 就可以了
        localStorage.removeItem('global');
        history.push('/login');
    }


    return (
        <Layout id='layout'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    管理平台
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    // defaultSelectedKeys={['1']}
                    items={currentMenus}
                    onClick={linkPage}
                />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <div className='headerBox'>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                        <Button
                            className='header-btn'
                            type='link'
                            onClick={logout}
                        >退出登陆</Button>
                    </div>

                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {routerRender()!}
                    {/* <Route path="/bannerManage">
                        <BannerManage></BannerManage>
                    </Route>
                    <Route path="/activityManage">
                        <ActivityManage></ActivityManage>
                    </Route> */}
                    {/* 注意：这种写法上需要带上父级路径
                    <Route path="/userManage/registerUserCheck">
                        <RegisterUserCheck></RegisterUserCheck>
                    </Route>
                    <Route path="/userManage/adminUserManage">
                        <AdminUserManage></AdminUserManage>
                    </Route> */}
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;