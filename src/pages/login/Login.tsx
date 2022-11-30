import './Login.scss';
import { Button, Checkbox, Form, Input, Card } from 'antd';

import { ILoginParams } from './Login.type';

export default function Login() {
    const login = (values: ILoginParams) => {
        console.log(values);
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