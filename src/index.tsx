import dva, { DvaOption } from 'dva';
import router from './router';
import './index.css';
import global from './model/global';
import { IGlobalState } from './model/type';

/**
 * 初始化 dva state 的方法
 */
const initialGlobalState = () => {
    const globalLocal = JSON.parse(localStorage.getItem('global') || "{}");
    // 首先同步现有的数据，再同步 localStorage 里面的数据
    // 遵循后进先出原则，（即如果 globalLocal 里面有key和 global.state 里面的key有相同的
    // 就可以覆盖掉
    return {
        ...global.state,
        ...globalLocal
    }
}

const app = dva({
    // 做dva数据持久化
    /***
     * 每次 state 改变都会触发，
     * 我们就可以每次改变的时候，存到 localstorage 里面
     * 在初始化的时候，再拿出来
     */
    onStateChange(state: { global: IGlobalState; }) {
        // 这里只对 global 模块里面进行持久化
        localStorage.setItem('global', JSON.stringify(state.global));
    },

    // 初始化的时候
    initialState: {
        global: initialGlobalState()
    }
} as unknown as DvaOption);

app.router(router);

// 引入 model
app.model(global);

// 挂载并启动项目
app.start("#root");