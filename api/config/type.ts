import { ResponseData } from "../common"


export interface ConfigInfo {
  value: string,
}

export interface ConfigData extends ResponseData {
  data: ConfigInfo
}
