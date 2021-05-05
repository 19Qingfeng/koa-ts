class SuccessModel<T = any> {
  msg: '';
  code: number;
  data: T;
  constructor(data: any) {
    this.msg = '';
    this.code = 0;
    this.data = data;
  }
}

const createSuccessModel = (data: any) => {
  if (data === undefined) data = {};
  return new SuccessModel(data);
};


export default createSuccessModel