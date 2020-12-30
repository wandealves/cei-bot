import InternalError from './internal.error';

export default class BusinessError extends InternalError {
  constructor(message: string) {
    super(`There was an error: ${message}`);
  }
}
