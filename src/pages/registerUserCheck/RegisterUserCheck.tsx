import { Button, Input, Radio, Space, Table, Modal, message } from "antd"
import useFetchList from "../../hooks/useFetchList"
import API from '../../api';
import { activityStatus } from "../activityManage/activityManage.config";
import { ColumnsType } from "antd/lib/table";
import { IUser } from "./registerUserCheck.type";
import useDeldata from "../../hooks/useDelData";

const { confirm } = Modal;

export default function RegisterUserCheck() {
    const { dataSource, total, filterParams, setFilterParams, getData } = useFetchList({
        API: API.getUsers,
        defaultParams: {
            isback: false
        }
    })

    const { ids, setIds, delData } = useDeldata({
        API: API.delUser,

    })

    const checkStatus = [
        {
            value: '',
            label: '全部'
        },
        {
            value: '0',
            label: '审核中'
        },
        {
            value: '1',
            label: '已通过'
        },
        {
            value: '2',
            label: '未通过'
        },
    ]

    const checkUser = async (checking: string, id: string) => {
        const checkName = checking === '1' ? '通过' : '拒绝';
        confirm({
            title: `确认${checkName}吗? 此操作不可逆`,
            async onOk() {
                await API.checkUser({ checking, id });
                message.success(`${checkName}成功`);
                setFilterParams({ ...filterParams, page: 1 });
            }
        })

    }



    const columns: ColumnsType<IUser> = [
        {
            title: "id",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "昵称",
            dataIndex: "nickName",
            key: "id"
        },
        {
            title: "手机号",
            dataIndex: "username",
            key: "id"
        },
        {
            title: "密码",
            dataIndex: "password",
            key: "id"
        },
        {
            title: "审核状态",
            dataIndex: "checking",
            key: "id",
            render: (text) => {
                const data = checkStatus.find(item => item.value === text);
                return data?.label;
            }
        },
        {
            title: "审核",
            dataIndex: "checking",
            key: "id",
            render: (text, item) => {
                return (
                    <Space>
                        <Button onClick={() => checkUser('1', item.id)} type="primary" disabled={text !== '0'}>通过</Button>
                        <Button onClick={() => checkUser('2', item.id)} danger disabled={text !== '0'}>拒绝</Button>
                    </Space>
                )
            },

        },

        {
            title: "操作",
            dataIndex: "id",
            key: "id",
            render: (text, item) => {
                return <Button danger onClick={() => delData([item.id])} > 删除</Button >
            },
        },
    ]


    return (
        <div>
            {/* 头部筛选栏 */}
            <Space>
                <Button onClick={getData}>刷新</Button>
                <Button disabled={ids.length === 0} danger onClick={() => delData()}>删除</Button>
                <Radio.Group
                    defaultValue=""
                    onChange={(e) => { // 改变筛选项，就会重新发送一次请求
                        setFilterParams({
                            ...filterParams,
                            page: 1, // 重置分页参数
                            checkStatus: e.target.value
                        } as any)
                    }}>
                    {
                        checkStatus.map((item, index) => (
                            <Radio.Button key={index} value={item.value}>
                                {item.label}
                            </Radio.Button>
                        ))
                    }
                </Radio.Group>

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
        </div>
    )
}