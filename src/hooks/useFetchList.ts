import { useEffect, useState } from "react";
import { BaseParams } from "../type";
import { IFetchListProps } from "./type";

export default function useFetchList<Response>(props: IFetchListProps<Response>) {

    const [dataSource, setDataSource] = useState<Response[]>([]);
    const [total, setTotal] = useState(0);

    // 定义分页参数
    const [filterParams, setFilterParams] = useState(new BaseParams());

    /***
     * 请求列表接口
     * 拿到对应的 dataSource，total
     * 传给后端
     */

    useEffect(() => {
        getData();
    }, [filterParams])

    const getData = async () => {
        const { list, pagination } = await props.API(filterParams);
        setDataSource(list);
        setTotal(pagination.total);
    }

    return {
        dataSource,
        total,
        filterParams,
        setFilterParams
    }
}