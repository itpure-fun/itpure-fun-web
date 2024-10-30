import type {
  TagList,
} from './type'

//request 
enum API {
  TAG_LIST = '/v1/avenue/tag/index',
}

//method
export const tagListAPi = (data: object) => useHttp.get(API.TAG_LIST, data)
// export const tagListAPi = (data: object) => useAsyncData(
//   () => $fetch('http://localhost:9501' + API.TAG_LIST, data)
// )