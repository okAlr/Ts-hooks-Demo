import { Key } from 'antd/lib/table/interface';
import { IActivity, IActivityParams } from '../pages/activityManage/activityManage.type';
import { ILoginParams, ILoginResponse } from '../pages/login/Login.type';
import { IBasePagination } from '../type';
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
    },


    // 获取活动列表
    getActivitys(data: IActivityParams) {
        return request.post<IActivityParams, IBasePagination<IActivity>>(
            "/admin/base/activityManage/page",
            data
        )
    },


    // 删除活动
    delActivity(ids: Key[]) {
        return request.post<Key[], {}>(
            "/admin/base/activityManage/delete",
            ids
        )
    },


    getCosAutograph() {
        return request.post<{}, {}>(
            "/admin/base/comm/cos/autograph",
        )
    }
}