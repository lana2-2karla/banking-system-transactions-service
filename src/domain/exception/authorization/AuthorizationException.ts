import TAuthorizationException from './TAuthorizationException';

class AuthorizationException extends Error {
  message: TAuthorizationException;
  constructor(error: TAuthorizationException) {
    super(error);
    this.message = error;
  }
}

export default AuthorizationException;