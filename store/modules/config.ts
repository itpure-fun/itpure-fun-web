import { defineStore } from 'pinia'
// import { getSearchEngineList } from '@/store/data/search-engine';
import { getConfigByCodeApi } from '~/api/config'
import type { ConfigInfo } from '~/api/config/type'
import { v4 as uuid } from "uuid"

export const useConfigStore = defineStore('config', {
  //用来存放变量
  state: () => ({
    configInfo: {} as ConfigInfo,
  }),
  //方法
  actions: {
    async getConfigByCode(params: any) {
      try {
        if (import.meta.client) await nextTick()
        const result:any = await getConfigByCodeApi(params)
        if (result.code == 200) {
          this.configInfo = result.data
          return result.data
        } else {
          return Promise.reject(new Error(result.message))
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
})