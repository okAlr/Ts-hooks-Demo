import { Role } from "../../type"

/**
 * 登陆传的参数
 * 
 */
export interface ILoginParams {
    userName: string,
    password: string
}


// 登陆接口的返回类型
export interface ILoginResponse {
    token: string,
    roles: Role[]
}