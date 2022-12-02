import { AnyAction } from "redux"

// 通用返回体
export interface IBaseResponse<T> {
    // 错误码：除1000外以外的都是错误
    code: number,

    // 报错信息
    message: string,

    // 接口具体返回数据
    data: T

}


// 用户角色
export enum Role {
    // 用户管理角色
    USERMANAGE = 'usermanage',

    // 活动管理角色
    ACTIVITYMANAGE = 'activityManage'
}

export interface IPayload<T extends Partial<AnyAction>> {
    payload: T
}

// 分页列表的基本类型
// 定义所有返回列表的统一格式
// （是根据接口文档来定义的各数据类型)
export interface IBasePagination<T> {
    // 接口返回的列表数据
    list: T[],

    // 分页信息对象
    pagination: {
        size: number,
        page: number,
        // 分页总数
        total: number
    }

}