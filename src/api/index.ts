import { Key } from 'antd/lib/table/interface';
import { IActivity, IActivityParams } from '../pages/activityManage/activityManage.type';
import { IBanner } from '../pages/bannerManage/bannerManage.type';
import { ILoginParams, ILoginResponse } from '../pages/login/Login.type';
import { BasePageParams, IBasePagination } from '../type';
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

    // 获取 cos 的token
    getCosAutograph() {
        return request.post<{}, {}>(
            "/admin/base/comm/cos/autograph",
        )
    },


    // 创建活动
    createActivity(data: IActivity) {
        return request.post<IActivity, {}>(
            "/admin/base/activityManage/add", data)
    },


    // 更新活动
    updateActivity(data: IActivity) {
        return request.post<IActivity, {}>(
            "/admin/base/activityManage/update", data)
    },

    // 获取详情
    getActivityDetail(id: string) {
        return request.get<string, IActivity>(`/admin/base/activityManage/info?id=${id}`)
    },

    // 获取轮播图列表
    getBanners(data: BasePageParams) {
        return request.post<BasePageParams, IBasePagination<IBanner>>(`/admin/base/banner/page`)
    },


    // 删除轮播图列表
    delBanners(ids: Key[]) {
        return request.post<Key[], {}>(`/admin/base/banner/delete`, { ids })
    },

    //创建轮播图列表
    createBanners(data: IBanner) {
        return request.post<IBanner, {}>(`/admin/base/banner/add`, data);
    }

}
