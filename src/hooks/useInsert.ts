// 负责新增和编辑的 hook

import { message } from "antd";
import { useEffect, useState } from "react";
import { IInsert } from "./type";

export default function useInsert<T>(props: IInsert<T>) {

    const [isModal, setIsmodal] = useState(false);

    // 关掉弹窗之后，需要清空表单数据
    useEffect(() => {
        if (!isModal) {
            props.form.resetFields();
        }
    }, [isModal])


    const handleOk = async () => {
        // 获取表单里面的数据
        let data = props.form.getFieldsValue(true);
        // 对表单的数据进行转换
        data = props.convertData ? props.convertData(data) : data;
        // 调用后端接口

        // 判断是编辑还是新增
        data.id ?
            props.updateData && (await props.updateData(data)) :
            props.createData && (await props.createData(data))


        // 暴露新的切面，也就是 insert 完成之后的一个回调
        props.success && props.success();

        // 弹窗
        message.success(data.id ? '更新成功' : '创建成功');
        setIsmodal(false);

    }


    // 回显表单数据的方法
    const setDataInfo = async (id: string) => {
        // 获取当前id的数据
        let data = await props.getDetail!(id);

        // 暴露出一个可以操作数据的方法
        (data as any) = props.convertDetailData && props.convertDetailData(data)

        // 给表单回显数据
        props.form.setFieldsValue(data as any);
        // 打开弹窗
        setIsmodal(true);
    }

    return {
        handleOk,
        setIsmodal,
        isModal,
        setDataInfo
    }
}