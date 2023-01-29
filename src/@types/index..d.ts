type TRequest = import('express').Request

interface IUserData {
  id: string
  username: string
  role: Role
}

interface IRequest extends TRequest {
  user: TUser
}
