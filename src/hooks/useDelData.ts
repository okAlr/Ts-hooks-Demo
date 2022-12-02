import { useState } from "react";
import { IDelData } from "./type";
import { message, Modal } from "antd";
import { Key } from "antd/lib/table/interface";

const { confirm } = Modal;

export default function useDeldata(props: IDelData) {
    const [ids, setIds] = useState<Key[]>([]);

    const delData = (currentIds?: string[]) => {
        confirm({
            title: props.title || '确认删除该数据吗?',
            async onOk() {
                // 如果有 currentIds ，代表单删
                // 如果没有 代表多删
                await props.API(currentIds || ids);
                message.success('删除成功');
                props.success && props.success()
            }
        })
    }

    return {
        ids,
        setIds,
        delData
    }
}