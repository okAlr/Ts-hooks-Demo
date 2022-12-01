/**
 * 用来存放 layout 页面的相关配置
 * 也就是说这个页面里面的数据 有可能后期由接口返回
 * 
 * 避坑处理：这里对外暴露的是一个对象，其实是一个引用数据类型，
 * 应该对外暴露一个不可变数据
 * 不然 可能会出现数据错乱
 */

import { Role } from "../type";

// 注意：下面的这个 key 是直接用的 路由
export const getMenus = () => [
    {
        key: '/bannerManage',
        label: '轮播图管理',
        roles: [Role.ACTIVITYMANAGE]
    },
    {
        key: '/activityManage',
        label: '活动管理',
        roles: [Role.ACTIVITYMANAGE]
    },
    {
        key: '/userManage',
        label: '用户管理',
        // 父级菜单的角色一定包含子级菜单的所有角色
        roles: [Role.USERMANAGE],
        // 子菜单
        children: [
            {
                key: '/userManage/registerUserCheck',
                label: '注册用户管理',
                roles: [Role.USERMANAGE]
            },
            {
                key: '/userManage/adminUserManage',
                label: '后台用户管理',
                roles: [Role.USERMANAGE]
            },

        ]
    },
]
