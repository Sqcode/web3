import request from '@/utils/request'

// 登录
export function login (data) {
  return request.post('/manage/login', data)
}
// // 根据token获取session
// getSession: () => {
//   return getAxios('/session/get');
// },
// // 登出
// logout: (token) => {
//   return getAxios(`/session/logOut?x-access-token=${token}`);
// },
// // 获取验证码
// getVerificationCode: () => {
//   return getAxios('/session/verificationCode');
// }

export default {
  login
}
