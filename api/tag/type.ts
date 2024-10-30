import { ResponseData } from "../common"

export interface TagInfo {
  id: number,
  title: string,
  color: string,
  textcolor: string,
}

export interface TagList extends ResponseData {
  data: TagInfo[]
}