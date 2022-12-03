import { Button, Input, DatePicker, Radio, Space, Image, Table, Modal, Form } from "antd";
import { ColumnsType } from "antd/lib/table";
import { activityStatus } from "./activityManage.config";
import { IActivity } from "./activityManage.type";
import UploadImg from '../../components/UploadImg';

import useFetchList from "../../hooks/useFetchList";
import API from '../../api';
import useDeldata from "../../hooks/useDelData";
import { useState } from "react";

const { RangePicker } = DatePicker;

export default function ActivityManage() {
    const [isModal, setIsmodal] = useState(false);

    // 调用列表hook，拿到可渲染的数据
    const { dataSource, total, filterParams, setFilterParams } = useFetchList<IActivity>({
        API: API.getActivitys
    })

    // 删除接口
    const { ids, setIds, delData } = useDeldata({
        API: API.delActivity,
        // 删除成功之后，需要重置分页参数
        success: () => {
            setFilterParams({
                ...filterParams,
                page: 1
            })
        }
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
            render: (text, item) => {
                return (
                    <Space>
                        <Button type="primary">编辑</Button>
                        <Button danger onClick={() => delData([item.id])}>删除</Button>
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
                <Button type="primary" onClick={() => setIsmodal(true)}>新增</Button>
                <Button danger onClick={() => delData()}>删除</Button>

                <Radio.Group
                    defaultValue=""
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
                // 多选
                rowSelection={{
                    type: 'checkbox',
                    onChange: (keys) => {
                        setIds(keys);
                    }
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


            {/* 新增活动的弹窗页面 */}
            <Modal title="新增" open={isModal}>
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                    <Form.Item
                        label="活动名"
                        name="activityName"
                        rules={[{ required: true, message: "请输入活动名" }]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="活动上限" name="activityMax">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="活动时间" name="activityDate">
                        <RangePicker />
                    </Form.Item>
                    <Form.Item label="主办方" name="business">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="活动封面" name="activityImg">
                        <UploadImg></UploadImg>
                    </Form.Item>
                    <Form.Item label="活动详情" name="activytyDesc">
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}