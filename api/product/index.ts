import type {
  ProductCateList,
  ProductList,
  SubmitProduct,
  ProductResponseData
} from './type'

//request 
enum API {
  PRODUCT_CATE_LIST = '/v1/avenue/productCategory/index',
  PRODUCT_LIST = '/v1/avenue/product/index',
  PRODUCT_ADD_CLICK = '/v1/avenue/product/addClick',
  PRODUCT_SUBMIT = '/v1/avenue/product/submit',
}

//method
export const productCateListAPi = (data: object) => useHttp.get(API.PRODUCT_CATE_LIST, {
  params: data
})
export const productListAPi = (data: object) => useHttp.get(API.PRODUCT_LIST, data)
export const productAddClickAPi = (id: Number, data: object) => useHttp.put(API.PRODUCT_ADD_CLICK + '/' + id, data)
export const productSubmitApi = (data: SubmitProduct) => useHttp.get(API.PRODUCT_SUBMIT, data)