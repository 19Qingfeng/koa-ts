import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { config } from './config';
import router from './router/index';

const app = new Koa();

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port, () => {
  console.log('server in prot');
});
