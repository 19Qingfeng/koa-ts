import 'module-alias/register';
import Koa from 'koa';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import router from './router/index';
import useToken from './middleware/token-middleware';
import useHttpException from './middleware/error-middleware';
import { config } from './config';

const app = new Koa();

app.use(json());

app.use(bodyParser());

app.use(useHttpException);

app.use(useToken);

app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port, () => {
  console.log('server in prot');
});
