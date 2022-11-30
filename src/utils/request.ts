import { message } from "antd";
import axios, { AxiosResponse } from "axios";
import { IBaseResponse } from '../type/index';

/***
 * AxiosResponse 接受两个泛型
 * 第一个 T 是规定业务层的请求体类型（根据后端接口返回的数据类型和格式），也就是接口定义的类型
 * 所以我们用统一的返回结构 IBaseResponse
 * 
 * IBaseResponse 又接收一个泛型类型，这个类型就泛指具体业务
 * 这个 data 的类型不同地方的API是不一定返回一样的，比如 login 和 banner 接口的返回就不一样
 * 
 * 
 */

axios.interceptors.response.use((response: AxiosResponse<IBaseResponse<any>>) => {
    // 按照我们的业务，返回 code 为非1000的时候都是报错，需要前端提示出来 message
    if (response.data.code !== 1000) {
        // 提示报错信息
        message.error(response.data.message);

        // 抛出错误，阻塞后续程序运行
        throw new Error(response.data.message);
    }

    // 正确的话，正常返回
    return response.data.data;
})

export default axios;