import { ResponseData } from "../common"

export interface TreeListReq {
}

export interface SearchEngineInfo {
  id: number,
  title: string,
  logo: string,
  desc: string,
  link: string,
  sort: number,
  cate_id: string
}

export interface SearchEngineTreeList {
  id: number,
  title: string,
  sort: number,
  engine: SearchEngineInfo[]
}

export interface AddSearchEngineCategoryReq {
  title: string,
  sort: number,
}


export interface UpdateSearchEngineCategoryReq {
  id: number,
  title: string,
  sort: number,
}


export interface DelSearchEngineCategoryReq {
  id: number,
}


export interface AddSearchEngineReq {
  title: string,
  logo: string,
  desc: string,
  link: string,
  sort: number,
  cate_id: number
}

export interface UpdateSearchEngineReq {
  id: number,
  title: string,
  logo: string,
  desc: string,
  link: string,
  sort: number,
  cate_id: number
}

export interface DelSearchEngineReq {
  id: number,
}

export interface TreeListResponse extends ResponseData {
  data: SearchEngineTreeList[]
}