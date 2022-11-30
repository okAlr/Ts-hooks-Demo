import { ILoginParams, ILoginResponse } from '../pages/login/Login.type';
import request from '../utils/request';
// 如果业务复杂的话，可以分割模块，现在我们可以整个 api 作为一层

export default {
    // 登陆
    /**
     * 第一个是接受的参数类型
     * 第二个是返回的参数类型(看post函数源码得出的)
     */
    login(data: ILoginParams) {
        return request.post<ILoginParams, ILoginResponse>('/admin/base/open/login', data);
    }
}