import { SwaggerRouter } from 'koa-swagger-decorator';

import ApiV1Router from './v1';

const router = new SwaggerRouter();

router.use('/api/v1', ApiV1Router.routes());

export default router;
