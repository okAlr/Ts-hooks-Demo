import { Model, routerRedux } from "dva";
import { IPayload } from "../type";
import { ILoginResponse } from '../pages/login/Login.type'

/***
 * 存放全局状态的
 */
export default {
    // 命名空间
    namespace: "global",

    state: {
        roles: [],
        token: ''
    },

    // 副作用：可以做异步操作，不能直接修改 state
    // 如果要修改 state ，必须使用put方法调用 reducers 里面的方法
    effects: {
        // 保存登陆后，接口返回的信息
        // payload 是我们规定一定会传的，所有参数都在 payload 里面
        *setUserInfo({ payload }: Partial<IPayload<ILoginResponse>>, { put }) {
            // 调用 reducers 里面的方法，修改对应的 token 和 roles
            yield put({
                type: 'save',
                payload
            })

            // 最后，跳转到活动管理页面(注意：yield 你就可以当作是 await，这里是需要同步执行的顺序)
            yield put(routerRedux.push('/activityManage'))

            // 接受参数后，赋值给 state

        }
    },

    // 纯函数（不能有副作用）
    // 必须有 return，return 的是什么，state 就是什么
    reducers: {
        /***
         * 为什么这里的 IPayload 方法传的是 any
         * 因为我们这个方法是通用的，所有的 effects 里面方法都要调用
         */
        save(state, action: Partial<IPayload<any>>) {
            return { ...state, ...action.payload };
        }
    },



    // subscriptions 方法：监听路由变化
    subscriptions: {
        setup({ history }) {
            // 每次路由变化都会调用这个方法
            history.listen((router) => {
                const globalLocal = JSON.parse(localStorage.getItem("global") || "{}");
                
                // 避免进入死循环，定义一个白名单：不需要校验 token 的有哪些路由
                // 要加上白名单的校验，如果不是在 白名单里面才校验是否存在 token
                const ignoreUrls = ['/login'];

                // 如果本地没有token，则代表用户未登陆，需要跳转到登陆页面
                if (!globalLocal.token && !ignoreUrls.includes(router.pathname)) {
                    history.push('/login');
                }

            })
        }
    }




} as Model