import { Key } from "antd/lib/table/interface";
import { IBasePagination } from "../type";

export interface IFetchListProps<Response> {
    //每个页面获取数据的接口
    API: (params: any) => Promise<IBasePagination<Response>>
}


// 删除数据接口
export interface IDelData {
    API: (ids: Key[]) => Promise<{}>;
    title?: string;
    success?: () => void
}