import { Context } from 'koa-swagger-decorator';
import { HttpException } from '../model/http-exception';

async function useHttpException(ctx: Context, next: () => Promise<void>) {
  try {
    await next();
  } catch (e) {
    if (e instanceof HttpException) {
      ctx.status = e.status;
      ctx.body = {
        msg: e.message,
        code: e.code,
      };
    } else {
      throw e;
    }
  }
}

export default useHttpException;
