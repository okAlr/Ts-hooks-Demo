import { Button, Form, Input, Modal, Radio, Space } from "antd"
import API from '../../api';
import useFetchList from "../../hooks/useFetchList"
import useDeldata from "../../hooks/useDelData";
import { IUser } from "../registerUserCheck/registerUserCheck.type";
import Table, { ColumnsType } from "antd/lib/table";
import useInsert from "../../hooks/useInsert";



export default function AdminUserManage() {
    const [form] = Form.useForm<IUser>();

    const { dataSource, total, filterParams, setFilterParams, getData } = useFetchList({
        API: API.getUsers,
        defaultParams: {
            isback: true
        }
    })

    const { ids, setIds, delData } = useDeldata({
        API: API.delUser,
        success: () => {
            setFilterParams({ ...filterParams, page: 1 })
        }
    })

    const { handleOk, setIsmodal, isModal, setDataInfo } = useInsert({
        form,
        createData: API.createUser,
        updateData: API.updateUser,
        getDetail: API.getUserDetail,
        success: () => {
            setFilterParams({
                ...filterParams,
                page: 1
            })
        }
    })

    const columns: ColumnsType<IUser> = [
        {
            title: "昵称",
            dataIndex: "nickName",
            key: "id"
        },
        {
            title: "用户名",
            dataIndex: "username",
            key: "id"
        },
        {
            title: "密码",
            dataIndex: "password",
            key: "id"
        },
        {
            title: "备注",
            dataIndex: "remark",
            key: "id"
        },

        {
            title: "操作",
            dataIndex: "id",
            key: "id",
            render: (text, item) => {
                return (
                    <Space>
                        <Button onClick={() => setDataInfo(item.id)}>编辑</Button >
                        <Button danger onClick={() => delData([item.id])} >删除</Button >
                    </Space>
                )
            },
        },
    ]

    return (
        <div>
            {/* 头部筛选栏 */}
            <Space>
                <Button onClick={getData}>刷新</Button>
                <Button type="primary" onClick={() => setIsmodal(true)}>新增</Button>
                <Button disabled={ids.length === 0} danger onClick={() => delData()}>删除</Button>

                {/* 模糊搜索 */}
                <Input
                    onChange={(e) => {
                        setFilterParams({
                            ...filterParams,
                            page: 1,
                            username: e.target.value
                        } as any)
                    }}
                    placeholder="请输入用户名"></Input>
            </Space>


            <Table
                columns={columns}
                dataSource={dataSource}
                rowSelection={{
                    type: 'checkbox',
                    onChange: (keys) => {
                        setIds(keys);
                    }
                }}>

            </Table>


            <Modal title="新增" open={isModal} onOk={handleOk} onCancel={() => setIsmodal(false)}>
                <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>

                    <Form.Item label="昵称" name="nickName">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="用户名" name="username">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="密码" name="password">
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="备注" name="remark">
                        <Input.TextArea />
                    </Form.Item>

                </Form>
            </Modal>


        </div>
    )
}