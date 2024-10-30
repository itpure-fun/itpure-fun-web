import type {
  LoginReqData,
  LoginResponseData,
  LogoutResponseData,
  RegisterReqData,
  RegisterResponseData,
  SendCodeEmailResponseData,
  sendCodeEmailReq,
  UserInfoResponseData,
  ForgetReqData,
  ForgetResponseData,
  GithubAuthUrlResponseData
} from './type'

//项目用户相关的请求地址
enum API {
  //login
  LOGIN = '/v1/auth/email/login',
  //logout
  LOGOUT = '/v1/auth/email/logout',
  //register
  REGISTER = '/v1/auth/email/register',
  //forget
  FORGET = '/v1/auth/email/forgetPassword',
  //注册 - 发送邮箱验证码
  SEND_CODE_EMAIL = '/v1/auth/email/sendRegisterCode',
  //忘记密码 - 发送邮箱验证码
  SEND_FORGET_CODE_EMAIL = '/v1/auth/email/sendForgetPasswordCode',
  //获取用户信息
  USER_INFO = '/v1/user/info',

  /** AUTH GITHUB */
  GITHUB_AUTH_URL = '/v1/auth/github/getAuthUrl',
  GITHUB_AUTH_CALLBACK = '/v1/auth/github/callback',
}

//login
export const loginApi = (data: LoginReqData) => useHttp.get(API.LOGIN, data)

//logout
export const logoutApi = (data: {}) => useHttp.post(API.LOGOUT, data)

//register
export const registerApi = (data: RegisterReqData) => useHttp.post(API.REGISTER, data)

//forget
export const forgetApi = (data: ForgetReqData) => useHttp.post(API.FORGET, data)

//register - send code
export const sendCodeEmailApi = (data: sendCodeEmailReq) => useHttp.post(API.SEND_CODE_EMAIL, data)

//forget - send code
export const sendForgetCodeEmailApi = (data: sendCodeEmailReq) => useHttp.post(API.SEND_FORGET_CODE_EMAIL, data)

//获取用户信息
export const userInfoApi = () => useHttp.get(API.USER_INFO)

//github auth: get url
export const getGithubAuthUrlApi = (data: {}) => useHttp.post(API.GITHUB_AUTH_URL, data)
export const getGithubAuthCallbackApi = (data: {}) => useHttp.post(API.GITHUB_AUTH_CALLBACK, data)