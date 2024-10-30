import type {
  ConfigData
} from './type'

//request 
enum API {
  GET_CONFIG_BY_CODE = '/v1/avenue/config/getConfigByCode',
}

//method
export const getConfigByCodeApi = (data: object) => useHttp.get(API.GET_CONFIG_BY_CODE, data)