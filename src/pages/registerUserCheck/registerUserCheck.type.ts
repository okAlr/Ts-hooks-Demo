import { BasePageParams } from "../../type";

export interface IUser {
    // 审核状态
    checking: string;
    id: string;
    isback: boolean;
    // 用户昵称
    nickName: string;
    // 备注
    remark: string;
    // 用户名
    username: string;
    password: string
}


export interface IUserParams extends BasePageParams {
    isback: boolean,
    checkStatus: string,
    username: string
}