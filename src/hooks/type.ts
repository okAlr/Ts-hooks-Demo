import { IBasePagination } from "../type";

export interface IFetchListProps<Response> {
    //每个页面获取数据的接口
    API: (params: any) => Promise<IBasePagination<Response>>
}