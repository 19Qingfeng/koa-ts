export class HttpException extends Error {
  msg: string;
  code: number;
  status: number;
  constructor(msg: string, code: number, status: number) {
    super(msg);
    this.msg = msg;
    this.code = code;
    this.status = status;
  }
}

const errorList = {
  token: (msg: string = 'Login Express') => {
    return new HttpException(msg, 401, 401);
  },
  server: (msg: string = 'Server to Server Error') => {
    return new HttpException(msg, 500, 500);
  },
  params: (msg: string = 'Params Error') => {
    return new HttpException(msg, 400, 400);
  },
};

type ErrorType = 'token' | 'server' | 'params';

const createErrorModel = (type: ErrorType, msg?: string) => {
  throw errorList[type](msg);
};

export default createErrorModel;
