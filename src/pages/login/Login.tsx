import './Login.scss';
import { Button, Checkbox, Form, Input, Card } from 'antd';

import { ILoginParams } from './Login.type';
import API from '../../api/index';

export default function Login() {
    const login = async (values: ILoginParams) => {
        const data = await API.login(values);
        // 调用完登陆接口后，拿到 token 和 相关角色
        // token 全局封装到 axios
        // 使用角色过滤对应的菜单
        // 最后，跳转到活动管理页面
    }

    return (
        <div id="login">

            <Card style={{ width: 300 }}>
                <h2 className='title'>管理平台</h2>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={login}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            登陆
                        </Button>
                    </Form.Item>
                </Form>
            </Card>




        </div>
    )
}