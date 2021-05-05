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
import { validate, ValidationError } from 'class-validator';
import { User, userSchema } from "../../validator/user";


const tag = tags(['User']);

// const userSchema = {
//   name: { type: 'string', required: true },
//   password: { type: 'string', required: true },
// };

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
    const validateUser = new User()
    const errors: ValidationError[] = await validate(validateUser);
    console.log(errors,'errors')
    const users = [{ name: 'foo' }, { name: 'bar' }];
    ctx.body = { users };
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
