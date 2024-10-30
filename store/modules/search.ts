import { defineStore } from 'pinia'
// import { getSearchEngineList } from '@/store/data/search-engine';
import { addSearchEngine, updateSearchEngine, delSearchEngine, addSearchEngineCateGory, delSearchEngineCateGory, searchEngineTreeList, updateSearchEngineCateGory } from '~/api/search'
import { SearchEngineTreeList, AddSearchEngineCategoryReq, UpdateSearchEngineCategoryReq, DelSearchEngineCategoryReq, AddSearchEngineReq, UpdateSearchEngineReq, DelSearchEngineReq } from '~/api/search/type'

export interface defaultEngineInterface {
  logo: string,
  title: string,
  link: string,
}

export const useSearchStore = defineStore('search', {
  //用来存放变量
  state: () => ({
    treelist: [] as SearchEngineTreeList[],
    defaultEngine: {
      logo: 'https://www.baidu.com/favicon.ico',
      title: '百度',
      link: 'https://www.baidu.com/s?wd={%s}',
    } as defaultEngineInterface
  }),
  //方法
  actions: {
    async getTreeList() {
      const result:any = await searchEngineTreeList([])
      if (result.code == 200) {
        this.treelist = result.data
        console.log(this.treelist)
        return this.treelist
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // cate
    async addCate(data: AddSearchEngineCategoryReq) {
      const result:any = await addSearchEngineCateGory(data)
      if (result.code == 200) {
        this.getTreeList()
        return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async updateCate(data: UpdateSearchEngineCategoryReq) {
      const result:any = await updateSearchEngineCateGory(data)
      if (result.code == 200) {
        this.getTreeList()
        return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async delCate(data: DelSearchEngineCategoryReq) {
      const result:any = await delSearchEngineCateGory(data)
      if (result.code == 200) {
        this.getTreeList()
        return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // engine
    async addEngine(data: AddSearchEngineReq) {
      const result:any = await addSearchEngine(data)
      if (result.code == 200) {
        this.getTreeList()
        return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async updateEngine(data: UpdateSearchEngineReq) {
      const result:any = await updateSearchEngine(data)
      if (result.code == 200) {
        this.getTreeList()
        return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async delEngine(data: DelSearchEngineReq) {
      const result:any = await delSearchEngine(data)
      if (result.code == 200) {
        this.getTreeList()
        return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  }
})