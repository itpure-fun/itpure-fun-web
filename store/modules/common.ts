import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  //用来存放变量
  state: () => ({
    isNavBoxItemLoading: false,
  }),
  //方法
  actions: {

  }
})