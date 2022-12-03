import { Button, Space, Table, Image, Modal, Form } from "antd";
import { ColumnsType } from "antd/lib/table";
import useFetchList from "../../hooks/useFetchList";
import { IBanner } from "./bannerManage.type";

import API from '../../api';
import useDeldata from "../../hooks/useDelData";
import UploadImg from "../../components/UploadImg";
import useInsert from "../../hooks/useInsert";

export default function BannerManage() {

    const [form] = Form.useForm<IBanner>();

    const { dataSource, total, filterParams, setFilterParams, getData } = useFetchList({
        API: API.getBanners
    })

    const { ids, setIds, delData } = useDeldata({
        API: API.delBanners,
        success: () => {
            setFilterParams({
                ...filterParams,
                page: 1
            })
        }
    })

    const { handleOk, setIsmodal, isModal } = useInsert({
        form,
        createData: API.createBanners,
        success: () => {
            setFilterParams({
                ...filterParams,
                page: 1
            })
        }
    })



    const columns: ColumnsType<IBanner> = [
        {
            title: "图片",
            dataIndex: "img",
            key: "id",
            render: (text) => {
                return <Image width={100} src={text}></Image>
            }
        },
        {
            title: "操作",
            dataIndex: "id",
            key: "id",
            render: (text, item) => {
                return (
                    <Space>
                        <Button danger onClick={() => delData([item.id])}>删除</Button>
                    </Space>
                )
            },
        }
    ]

    return (
        <div>
            <Space>
                <Button onClick={getData}>刷新</Button>
                <Button type="primary" onClick={() => setIsmodal(true)}>新增</Button>
                <Button danger onClick={() => delData()}>删除</Button>
            </Space>

            <Table
                pagination={{
                    total,
                    pageSize: filterParams.size,
                    current: filterParams.page,
                    onChange: (page) => {
                        setFilterParams({
                            ...filterParams,
                            page
                        })
                    }
                }}

                rowSelection={{
                    type: 'checkbox',
                    onChange: (keys) => {
                        setIds(keys)
                    }
                }}
                columns={columns} dataSource={dataSource}>

            </Table>



            <Modal title="新增" open={isModal} onOk={handleOk} onCancel={() => setIsmodal(false)}>
                <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>

                    <Form.Item label="图片" name="img">
                        <UploadImg></UploadImg>
                    </Form.Item>

                </Form>
            </Modal>


        </div>
    )
}