// 引入了nuxt/app模块中的UseFetchOptions类型,UseFetchOptions类型是一个用于配置请求选项的接口或类型
import type { UseFetchOptions } from "nuxt/app";
import { v4 as uuid } from "uuid"

//  HTTP 请求的方法
type Methods = "GET" | "POST" | "DELETE" | "PUT";


// 请求结果数据格式
export interface IResultData<T> {
    code: number;
    data: T;
    msg: string;
}

/**
 * api请求封装，使用useFetch函数
 * @param { String } url 请求地址
 * @param { String } method 请求方法
 * @param { Object } data 请求数据
 * @param { UseFetchOptions } options 请求选项
 */

/**
 * options常用参数说明
 * @param { boolean } lazy    是否在加载路由后才请求该异步方法，默认为false
 * @param { boolean } server  是否在服务端请求数据，默认为true
 */
class HttpRequest {
     request<T = any>(url: string, method: Methods, data: any, options?: UseFetchOptions<T>) {
        return new Promise(async (resolve, reject) => {
            // URL 基地址
            const runtimeConfig = useRuntimeConfig()

            // 处理：本地docker环境中客户端发送请求需要将容器名转换成ip
            let baseUrl = runtimeConfig.public.baseURL
            if (import.meta.client) {
                let pattern = 'http://nginx';
                let replacement = 'http://127.0.0.1:80';
                if (baseUrl.indexOf(pattern) !== -1) {
                    baseUrl = baseUrl.replace(pattern, replacement)
                }
            }

            // BASE_URL
            const BASE_URL = baseUrl;

            // if (import.meta.server) {
            //     console.log('server url---')
            //     console.log(BASE_URL)
            // }

            // if (import.meta.client) {
            //     console.log('client url---')
            //     console.log(BASE_URL)
            // }
            
            //userStore
            const userStore = useUserStore()
            
            // 继承UseFetchOptions类型，包含了baseURL和method两个属性
            const newOptions: UseFetchOptions<T> = {
                baseURL: BASE_URL,
                method,
                server: true,
                //key
                key: uuid(),    
                //请求拦截器
                onRequest({ request, options }) {
                    // 设置请求报头
                    options.headers = options.headers || {}
                    // @ts-ignore
                    options.headers.set('Authorization', 'Bearer ' + userStore.token||null)
                },
                //响应拦截器
                onResponse({ request, response, options })  {
                    if (response._data.code == 401) {
                        //登录失效
                        userStore.token = ''
                        response._data.message = "登录失效"

                    }
                },
                ...options,
            };

            // 根据请求方法处理请求的数据
            if (method === "GET" || method === "DELETE") {
                // 将数据设置为newOptions的params属性
                newOptions.params = data;
            }
            if (method === "POST" || method === "PUT") {
                // 将数据设置为newOptions的body属性
                newOptions.body = data;
            }

            // console.log(url)

            // 发送请求
            await useFetch(url, newOptions)
                .then((res) => {
                    // console.log('data---')
                    // console.log(res)
                    resolve(res.data.value);
                })
                .catch((error) => {
                    // console.log('error---')
                    // console.log(error)
                    reject(error);
                });
        });
    }

    // 封装常用方法
    get<T = any>(url: string, params?: any, options?: UseFetchOptions<T>) {
        return this.request(url, "GET", params, options);
    }

   
    post<T = any>(url: string, data: any, options?: UseFetchOptions<T>) {
        return this.request(url, "POST", data, options);
    }

   
    put<T = any>(url: string, data: any, options?: UseFetchOptions<T>) {
        return this.request(url, "PUT", data, options);
    }

    
    delete<T = any>(url: string, params: any, options?: UseFetchOptions<T>) {
        return this.request(url, "DELETE", params, options);
    }
}

const useHttp = new HttpRequest();

export default useHttp;