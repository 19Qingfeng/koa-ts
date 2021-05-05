import { Context } from 'koa-swagger-decorator';

export default async function useToken(
  ctx: Context,
  next: () => Promise<void>
) {
  await next();
}
