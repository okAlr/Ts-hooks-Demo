/**
 * 用来存放 layout 页面的相关配置
 * 也就是说这个页面里面的数据 有可能后期由接口返回
 */

// 注意：下面的这个 key 是直接用的 路由
export const menus = [
    {
        key: '/bannerManage',
        label: '轮播图管理',
    },
    {
        key: '/activityManage',
        label: '活动管理'
    },
    {
        key: '/userManage',
        label: '用户管理',
        // 子菜单
        children: [
            {
                key: '/userManage/registerUserCheck',
                label: '注册用户管理'
            },
            {
                key: '/userManage/adminUserManage',
                label: '后台用户管理'
            },
            
        ]
    },
]
