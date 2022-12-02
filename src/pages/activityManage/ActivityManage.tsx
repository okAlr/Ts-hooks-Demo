import { Button, Input, Radio, Space, Image, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { activityStatus } from "./activityManage.config";
import { IActivity } from "./activityManage.type";

import useFetchList from "../../hooks/useFetchList";
import API from '../../api';

export default function ActivityManage() {

    // 调用列表hook，拿到可渲染的数据
    const { dataSource, total, filterParams, setFilterParams } = useFetchList<IActivity>({
        API: API.getActivitys
    })

    const columns: ColumnsType<IActivity> = [
        {
            title: "活动名称",
            dataIndex: "activityName",
            key: "id",
            width: 300
        },
        {
            title: "活动封面",
            dataIndex: "activityImg",
            key: "id",
            width: 100,
            // render 第一个参数是 我们dataIndex 定义的值
            render: (text) => {
                return (
                    <Image width={100} src={text} />
                )
            }
        },
        {
            title: "活动状态",
            dataIndex: "activityStatus",
            key: "id",
            width: 100,
            // render 第一个参数是 我们dataIndex 定义的值
            render: (text) => {
                return getActivityStatusName(text);
            }
        },
        {
            title: "活动上限",
            dataIndex: "activityMax",
            key: "id",
            width: 100
        },
        {
            title: "报名人数",
            dataIndex: "activityRegistered",
            key: "id",
            width: 100
        },
        {
            title: "活动时间",
            dataIndex: "activityStartDate",
            key: "id",
            width: 100,
            render: (text, item) => {
                return `${item.activityStartDate}-${item.activityEndDate}`
            }
        },
        {
            title: "主办方",
            dataIndex: "business",
            key: "id",
            width: 100
        },
        {
            title: "操作",
            dataIndex: "id",
            key: "id",
            render: () => {
                return (
                    <Space>
                        <Button type="primary">编辑</Button>
                        <Button danger>删除</Button>
                        <Button>查看报名人数</Button>
                    </Space>

                )
            }
        },
    ];


    // 根据活动状态返回的字符串数字做映射
    const getActivityStatusName = (text: string) => {
        switch (text) {
            case "0":
                return "未开始";
            case "1":
                return "进行中";
            case "2":
                return "已结束";
        }
    }


    return (
        <div>
            {/* 头部筛选栏 */}
            <Space>
                <Button>刷新</Button>
                <Button type="primary">新增</Button>
                <Button danger>删除 </Button>

                <Radio.Group
                    defaultValue=""
                    size="large"
                    onChange={(e) => { // 改变筛选项，就会重新发送一次请求
                        setFilterParams({
                            ...filterParams,
                            page: 1, // 重置分页参数
                            activityStatus: e.target.value
                        } as any)
                    }}>
                    {
                        activityStatus.map((item, index) => (
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
                            activityName: e.target.value
                        } as any)
                    }}
                    placeholder="请输入活动名称"></Input>
            </Space>

            <Table
                style={{ marginTop: '20px' }}
                columns={columns}
                dataSource={dataSource}
                scroll={{
                    x: 1500
                }}
                pagination={{
                    total,
                    pageSize: filterParams.size,
                    current: filterParams.page,
                    // 实现分页
                    onChange: (page) => {
                        setFilterParams({
                            ...filterParams,
                            page
                        })
                    }
                }}>

            </Table>
        </div>
    )
}