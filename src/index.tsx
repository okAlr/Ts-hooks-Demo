import dva from 'dva';
import router from './router';
import './index.css';

const app = dva();

app.router(router);

// 挂载并启动项目
app.start("#root");