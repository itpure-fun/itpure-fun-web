import { defineStore } from 'pinia'
import { loginApi, registerApi, sendCodeEmailApi, userInfoApi, logoutApi, sendForgetCodeEmailApi, forgetApi, getGithubAuthUrlApi, getGithubAuthCallbackApi} from '@/api/user'
import type { LoginReqData, RegisterReqData, sendCodeEmailReq, ForgetReqData } from '~/api/user/type'
import { errorMessages } from 'vue/compiler-sfc';


export const useUserStore = defineStore('user', {
  //用来存放变量
  state: () => ({
    token: '',//token
    username: '',
    avatar: '',
    email: '',
  }),
  //方法
  actions: {
    //获取登录状态
    isLogin() {
      let flag = false;
      if (this.token != null && this.token != undefined && this.token != '') {
        flag = true;
      } 
      // console.log(111)
      // console.log(this.token)
      // console.log(flag)
      return flag;
    },
    //login
    async login(data: LoginReqData) {
      if (import.meta.client) await nextTick() 
      //发送请求
      const result: any = await loginApi(data)

      if (result.code == 200) {
        //仓库存储token
        this.token = result.data.token
        //本地存储token
        // localStorage.setItem('TOKEN', result.data.token)
        return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //logout
    async logout() {
      //发送请求
      const result: any = await logoutApi({})
      if (result.code == 200) {
        //本地存储token
        // localStorage.setItem('TOKEN', '')
        this.token = ''
        return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //register
    async register(data: RegisterReqData) {
      if (import.meta.client) await nextTick() 
      //发送请求
      const result: any = await registerApi(data)
      if (result.code == 200) {
          return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //forget
    async forget(data: ForgetReqData) {
      if (import.meta.client) await nextTick() 
      //发送请求
      const result: any = await forgetApi(data)
      if (result.code == 200) {
          return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //register - send code email
    async sendCodeEmail(data: sendCodeEmailReq) {
      if (import.meta.client) await nextTick() 
      //发送请求
      const result: any = await sendCodeEmailApi(data)
      if (result.code == 200) {
          return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //forget - send code email
    async sendForgetCodeEmail(data: sendCodeEmailReq) {
      if (import.meta.client) await nextTick() 
      //发送请求
      const result: any = await sendForgetCodeEmailApi(data)
      if (result.code == 200) {
          return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //获取用户信息
    async userInfo() {
      try {
          //if (import.meta.client) await nextTick() 
          if (!this.isLogin()) {
            return
          }
          //发送请求
          const result: any = await userInfoApi()
          if (result.code == 200) {
            this.username = result.data.nick_name
            this.avatar = result.data.avatar
            this.email = result.data.email
            return result.message
          } else {
            throw new Error(result.message)
          }
      } catch (error: any) {
        ElMessage.error(error.message)
      }
    },

    async githubAuthUrl(data: {}) {
      if (import.meta.client) await nextTick() 
      //发送请求
      const result: any = await getGithubAuthUrlApi(data)
      if (result.code == 200) {
          return result.data
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async githubAuthCallback(data: {}) {
      try {
        if (import.meta.client) await nextTick() 
        //发送请求
        const result: any = await getGithubAuthCallbackApi(data)
        if (result.code == 200) {
            //仓库存储token
            this.token = result.data.token
            return result.message
        } else {
          // return Promise.reject(new Error(result.message))
        }
      } catch (error) {
        console.log(error)
      }

    },
  },
  //持久化
  persist: {
    storage: piniaPluginPersistedstate.localStorage()
  },
})