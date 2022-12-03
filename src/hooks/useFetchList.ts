import { useEffect, useState } from "react";
import { BasePageParams } from "../type";
import { IFetchListProps } from "./type";

export default function useFetchList<Response>(props: IFetchListProps<Response>) {

    const [dataSource, setDataSource] = useState<Response[]>([]);
    const [total, setTotal] = useState(0);

    // 定义分页参数
    const [filterParams, setFilterParams] = useState(new BasePageParams());

    /***
     * 请求列表接口
     * 拿到对应的 dataSource，total
     * 传给后端
     */

    useEffect(() => {
        getData();
    }, [filterParams])

    // 获取数据
    const getData = async () => {
        const { list, pagination } = await props.API(filterParams);

        list.forEach((item: any) => {
            item.key = item.id;
        })

        setDataSource(list);
        setTotal(pagination.total);
    }

    return {
        dataSource,
        total,
        filterParams,
        setFilterParams,
        getData
    }
}