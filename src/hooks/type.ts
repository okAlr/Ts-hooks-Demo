import { FormInstance } from "antd";
import { Key } from "antd/lib/table/interface";
import { IBasePagination } from "../type";

export interface IFetchListProps<Response> {
    //每个页面获取数据的接口
    API: (params: any) => Promise<IBasePagination<Response>>;
    defaultParams?: Object
}


// 删除数据接口
export interface IDelData {
    API: (ids: Key[]) => Promise<{}>;
    title?: string;
    success?: () => void
}


export interface IInsert<T> {
    form: FormInstance<T>,
    convertData?: (data: T) => T,
    updateData?: (data: T) => void,
    createData?: (data: T) => void,
    success?: () => void,
    getDetail?: (id: string) => Promise<T>,
    convertDetailData?: (data: T) => T
}