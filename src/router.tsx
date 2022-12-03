// dva 里面的 router 和 react-router-dom一样
import { Route, Router, Switch } from "dva/router";

import Layout from "./layout/layout";
import Login from "./pages/login/Login";
import { RouterAPI } from "dva";
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from "antd";



// 所涉及到的类型如 RouterAPI，api，返回值等等都是点进router函数源码里面去看的
export default function router(api?: RouterAPI) {
    if (api) {
        return (
            <ConfigProvider locale={zhCN}>
                <Router history={api.history}>
                    <Switch>
                        <Route path="/login">
                            <Login></Login>
                        </Route>
                        <Route path="/">
                            <Layout></Layout>
                        </Route>
                    </Switch>
                </Router>
            </ConfigProvider>
        )
    }
    return {};
}