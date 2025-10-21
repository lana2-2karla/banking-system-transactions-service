type AuthorizationExceptionType =
  | 'tokenNotProvided'
  | 'invalidToken'
  | 'expiredToken'
  | 'forbidden';

export default AuthorizationExceptionType;