import {
  request,
  summary,
  body,
  tags,
  middlewares,
  path,
  description,
  orderAll,
  Context,
} from 'koa-swagger-decorator';
import { User, userSchema } from '../../validator/user';
import validate from '@validate/index';
import createSuccessModel from '@model/http-success';

const tag = tags(['User']);

const logTime = () => async (ctx: Context, next: () => Promise<void>) => {
  console.log(`start: ${new Date()}`);
  await next();
  console.log(`end: ${new Date()}`);
};
@orderAll(1)
export default class UserRouter {
  @request('POST', '/user/register')
  @summary('register user')
  @description('example of api')
  @tag
  @middlewares([logTime()])
  @body(userSchema)
  static async register(ctx: Context) {
    const { name } = ctx.validatedBody;
    const user = { name };
    ctx.body = { user };
  }

  @request('post', '/user/login')
  @summary('user login, password is 123456')
  @tag
  @body(userSchema)
  static async login(ctx: Context) {
    const { name, password } = ctx.validatedBody;
    if (password !== '123456') throw new Error('wrong password');
    const user = { name };
    ctx.body = { user };
  }

  @request('get', '/user')
  @summary('user list')
  @tag
  static async getAll(ctx: Context) {
    // const validateUser = new User();
    // await validate(validateUser);
    const users = [{ name: 'foo' }, { name: 'bar' }];
    const responseData = createSuccessModel(users);
    ctx.body = responseData;
  }

  @request('get', '/user/{id}')
  @summary('get user by id')
  @tag
  @path({ id: { type: 'string', required: true } })
  static async getOne(ctx: Context) {
    const { id } = ctx.validatedParams;
    console.log('id:', id);
    const user = { name: 'foo' };
    ctx.body = { user };
  }

  @request('DELETE', '/user/{id}')
  @summary('delete user by id')
  @tag
  @path({ id: { type: 'string', required: true } })
  static async deleteOne(ctx: Context) {
    const { id } = ctx.validatedParams;
    console.log('id:', id);
    ctx.body = { msg: 'success' };
  }
}
