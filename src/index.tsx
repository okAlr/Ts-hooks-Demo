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
    // 遵循后进先出原则
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
        localStorage.setItem('global', JSON.stringify(state.global));
    },

    initialState: {
        global: initialGlobalState()
    }
} as unknown as DvaOption);

app.router(router);

// 引入 model
app.model(global);

// 挂载并启动项目
app.start("#root");