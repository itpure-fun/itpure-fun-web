import { defineStore } from 'pinia'
import { tagListAPi } from '~/api/tag'
import type { TagInfo } from '~/api/tag/type'

export const useTagStore = defineStore('tag', {
  //用来存放变量
  state: () => ({
    tagList: [] as TagInfo[],
    test2: 'String'
  }),
  //方法
  actions: {
    async getTagList(params: any) {
      try {
        if (import.meta.client) await nextTick() 
        const result:any = await tagListAPi(params)
        // console.log(result.code)
        if (result.code == 200) {
          this.tagList = result.data
          // console.log(this.tagList)
          return this.tagList
        } else {
          throw new Error(result.message)
        }
      } catch (error:any) {
        ElMessage.error(error.message)
      }
    },
  }
})