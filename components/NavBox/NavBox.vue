<script setup lang="ts">
import { goto } from '~/utils/url'
const productStore = useProductStore()
const tagStore = useTagStore()

const showType = ref('all')


const selectOptions = [
  {
    value: 1,
    label: '最新收录',
  },
  {
    value: 2,
    label: '热门产品',
  },
]


const tagId = ref(0)
const selectSort = ref(1)

const loadmore = () => {
  let nextPage = 0;
  if (productStore.productListPageInfo.currentPage >= productStore.productListPageInfo.totalPage) {
    nextPage = productStore.productListPageInfo.totalPage
  } else if (productStore.productListPageInfo.currentPage < 1) {
    nextPage = 1
  } else {
    nextPage = productStore.productListPageInfo.currentPage + 1;
  }
  
  productStore.getProductList({
    loadmore: true,
    page: nextPage,
    tag_id: tagId.value,
    sort: selectSort.value,
  })
}

const clickTag = (cId: number) => {
  tagId.value = cId
  productStore.getProductList({
    // cate_id: cateId.value,
    sort: selectSort.value,
    tag_id: tagId.value
  })
}

const changeSelect = () => {
  tagId.value = 0
  productStore.getProductList({
    sort: selectSort.value,
    tag_id: tagId.value,
  })
}

const clickProduct = (id: number, link: string) => {
  productStore.addClick(id)
  goto(link)
}


await tagStore.getTagList({
  onlyMenu: 1,
  type: 0
})
await productStore.getProductList(productStore.productListParams)
onMounted(() => {

})

defineExpose({

})
</script>

<template>
  <div class="p-5 mt-5 flex flex-col items-center">
    <div class="flex items-center ">
      <!-- <el-select
        v-model="selectSort"
        placeholder="Select"
        style="width: 100px; min-width: 100px;"
        @change="changeSelect"
      >
        <el-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select> -->

      <!-- <el-scrollbar> -->
        <div class="flex flex-wrap">
          <div 
            @click="clickTag(0)" class="mt-2 pl-2 pr-2 pt-1 pb-1 rounded-md font-bold ml-2 hover:text-white hover:bg-black cursor-pointer whitespace-nowrap" 
            :class="tagId == 0 ? 'text-white bg-black' : 'bg-gray-200'">
            全部
          </div>
          <div 
            @click="clickTag(item.id)" class="mt-2 pl-2 pr-2 pt-1 pb-1 rounded-md font-bold ml-2 hover:text-white hover:bg-black cursor-pointer whitespace-nowrap" 
            :class='tagId == item.id ? "text-white bg-black" : ""'
            :style='tagId == item.id ? "" : "background-color: " + item.color + "; color: " + item.textcolor + ";"'
            v-for="(item, index) in tagStore.tagList" :key="index">
            {{ item.title }}
          </div>
        </div>
      <!-- </el-scrollbar> -->
    </div>


    <div class="flex flex-col items-center mt-10 c-2xl:w-4/5 justify-center">
      <div class="grid grid-auto-rows grid-cols-4 w-full gap-5 c-lg:grid-cols-4 c-md:grid-cols-3 c-sm:grid-cols-2 c-xs:grid-cols-1">
        
        <div v-if="productStore.productLoadFinish" v-for="(item, index) in productStore.productList" :key="index" class="flex flex-col border-solid rounded-md w-full h-[170px] border-[1px] bg-white border-gray-200 p-3">
          <div class="flex items-center">
            <el-image :src="item.logo" class="w-10 h-10 min-h-[3rem] min-w-[3rem] rounded-full" lazy></el-image>
            <div class="flex justify-between ml-2 w-full">
              <div class="flex">
                <div class="font-semibold text-lg line-clamp-1">{{ item.title }}</div>
              </div>
            </div>

            <div class="relative top-[-15px] flex items-center">
                <div>
                  <svg v-if="item.new == 1" t="1723710814505" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="35256" width="25" height="25"><path d="M914.944 529.92c-13.312-15.872-10.752-22.528 1.024-36.352 58.88-71.68 27.136-171.008-62.976-194.56-22.528-6.144-32.256-12.8-24.576-31.744 2.56-91.136-85.504-152.576-171.008-120.32-19.968 7.68-27.136 6.144-39.424-11.776-51.712-75.776-159.744-75.776-211.456 0-12.288 17.92-19.968 18.944-39.424 11.776-87.552-31.744-176.64 30.72-170.496 120.832 1.536 22.528-5.632 26.112-25.088 31.232-90.112 24.064-122.88 124.928-62.976 195.072 13.312 15.36 11.776 22.016-0.512 36.864-59.392 73.216-25.6 172.032 67.584 196.096 16.896 4.608 22.528 7.68 21.504 27.136-5.632 95.232 81.408 156.16 174.08 122.88 17.408-6.144 23.552-4.608 33.792 10.24 53.76 79.872 161.792 79.36 215.04-1.024 10.752-15.872 16.896-15.872 33.792-9.216 91.648 34.304 181.76-30.72 173.568-124.928-1.536-17.408 3.072-20.48 19.456-24.064 94.72-25.088 130.048-125.44 68.096-198.144m-655.36 157.184l-49.664-143.36c-4.096-12.288 0-20.992 13.312-26.112 7.68-1.024 14.336 0 19.968 3.072L366.592 599.04l1.024-0.512-33.28-95.232c-4.096-12.288 0-20.992 13.312-26.112 12.8-3.584 22.016 1.024 27.136 13.312l49.664 143.36c3.584 11.776-1.536 19.968-14.336 24.064-7.168 2.56-13.824 2.048-19.456-1.536l-122.88-77.312-1.024 0.512 32.768 94.208c3.584 11.776-1.536 19.968-14.336 24.064-12.288 4.608-21.504 1.024-25.6-10.752M448 624.64l-48.128-138.24c-4.608-13.824-0.512-23.04 12.8-28.16l68.096-22.016c11.776-3.072 19.968 0.512 25.088 10.24 2.56 12.288-1.536 19.968-12.8 24.064l-48.128 15.36 12.8 36.352 44.544-14.336c12.8-2.56 21.504 1.024 26.624 11.264 2.56 11.776-2.048 19.456-14.336 24.064l-44.544 14.336 13.312 38.4 50.176-16.384c12.288-3.072 20.48 0.512 25.088 10.24 2.56 12.288-1.536 19.968-12.8 24.064l-70.144 22.528c-13.824 4.096-22.528 0-27.648-11.776m152.064-47.616L517.12 451.072c-2.56-2.048-3.584-5.12-4.096-8.704-2.56-10.24 1.536-17.408 13.312-23.04 11.264-3.584 20.992 0 28.672 11.264l59.392 98.816 1.024-0.512-3.072-121.344c0.512-10.24 5.632-17.408 16.384-21.504 10.24-2.56 18.944 0 26.624 7.68l73.216 98.304 1.024-0.512-13.824-112.64c-2.56-12.288 2.048-20.992 14.848-25.6 11.776-2.56 19.968 1.024 25.088 10.24 1.024 3.072 2.048 6.144 2.048 9.216l13.824 148.48c-1.024 13.312-7.68 22.016-20.48 26.112-14.336 4.608-25.6 2.048-33.28-7.68l-65.536-87.04 2.048 107.52c-1.024 12.8-8.192 20.992-20.992 25.088-15.36 5.632-26.624 2.56-33.28-8.192m0 0" fill="#1afa29" p-id="35257" data-spm-anchor-id="a313x.search_index.0.i13.1b3f3a81b9kyMw" class=""></path></svg>
                  <!-- <svg t="1723710877213" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="40079" width="25" height="25"><path d="M757.92384 382.68928c-1.58208 110.4384-46.4384 157.41952-46.4384 157.41952-4.21888-245.96992-247.03488-509.6448-247.03488-509.6448 80.2304 163.31776-274.48832 368.64512-274.48832 663.12704 0 184.71936 227.85024 320.4096 342.04672 297.12384 493.53728-100.59776 225.91488-608.0256 225.91488-608.0256zM510.16192 916.67968s-255.80544-125.86496-7.18336-404.79232c0 0 123.52 125.12256 99.7632 241.71008 0 0 34.83136 3.69152 79.1808-59.77088-0.01024 0.00512 10.34752 177.10592-171.76064 222.85312z" fill="#E93534" p-id="40080"></path></svg> -->
                  <svg v-else t="1723710877213" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="40079" width="25" height="25"><path d="M757.92384 382.68928c-1.58208 110.4384-46.4384 157.41952-46.4384 157.41952-4.21888-245.96992-247.03488-509.6448-247.03488-509.6448 80.2304 163.31776-274.48832 368.64512-274.48832 663.12704 0 184.71936 227.85024 320.4096 342.04672 297.12384 493.53728-100.59776 225.91488-608.0256 225.91488-608.0256zM510.16192 916.67968s-255.80544-125.86496-7.18336-404.79232c0 0 123.52 125.12256 99.7632 241.71008 0 0 34.83136 3.69152 79.1808-59.77088-0.01024 0.00512 10.34752 177.10592-171.76064 222.85312z" fill="#cdcdcd" p-id="40080" data-spm-anchor-id="a313x.search_index.0.i19.1b3f3a81b9kyMw" class=""></path></svg>
                </div>
                <div>
                  <el-text v-if="item.new != 1 && item.click > 0">{{ item.click }}</el-text>
                </div>
            </div>
          </div>

          <div class="whitespace-2 overflow-hidden text-ellipsis line-clamp-2 mt-2 h-12">
              <el-text>{{ item.desc }}</el-text>
          </div>

          <div class="flex justify-between mt-3">
            <div class="">
              <el-tag 
                effect="dark" 
                class="mr-2" 
                v-for="(_item, _index) in item.product_tag" 
                :key="index" 
                :style="'background-color: ' + _item.color + '; border: 0px; color:' + _item.textcolor + ';'">
                  {{ _item!.title }}
                </el-tag>
            </div>
            
            <div class="flex items-center">
              <el-icon @click="clickProduct(item.id, item.link)" class="cursor-pointer">
                  <svg t="1723709446546" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18691" width="200" height="200"><path d="M892 928.1H134c-19.9 0-36-16.1-36-36v-758c0-19.9 16.1-36 36-36h314.1c19.9 0 36 16.1 36 36s-16.1 36-36 36H170v686h686V579.6c0-19.9 16.1-36 36-36s36 16.1 36 36v312.5c0 19.9-16.1 36-36 36z" fill="#333333" p-id="18692"></path><path d="M927.9 131.6v-0.5c-0.1-1.7-0.4-3.3-0.7-4.9 0-0.1 0-0.2-0.1-0.3-0.4-1.7-0.9-3.3-1.5-4.9v-0.1c-0.6-1.6-1.4-3.1-2.2-4.6 0-0.1-0.1-0.1-0.1-0.2-0.8-1.4-1.7-2.8-2.7-4.1-0.1-0.1-0.2-0.3-0.3-0.4-0.5-0.6-0.9-1.1-1.4-1.7 0-0.1-0.1-0.1-0.1-0.2-0.5-0.6-1-1.1-1.6-1.6l-0.4-0.4c-0.5-0.5-1.1-1-1.6-1.5l-0.1-0.1c-0.6-0.5-1.2-1-1.9-1.4-0.1-0.1-0.3-0.2-0.4-0.3-1.4-1-2.8-1.8-4.3-2.6l-0.1-0.1c-1.6-0.8-3.2-1.5-4.9-2-1.6-0.5-3.3-1-5-1.2-0.1 0-0.2 0-0.3-0.1l-2.4-0.3h-0.3c-0.7-0.1-1.3-0.1-2-0.1H640.1c-19.9 0-36 16.1-36 36s16.1 36 36 36h165L487.6 487.6c-14.1 14.1-14.1 36.9 0 50.9 7 7 16.2 10.5 25.5 10.5 9.2 0 18.4-3.5 25.5-10.5L856 221v162.8c0 19.9 16.1 36 36 36s36-16.1 36-36V134.1c0-0.8 0-1.7-0.1-2.5z" fill="#333333" p-id="18693"></path></svg>
              </el-icon>
            </div>
            
          </div>
        </div>
        
      </div>

      <div class="flex justify-center mt-5" v-if="productStore.productListPageInfo.totalPage - productStore.productListPageInfo.currentPage > 0">
        <el-button text bg @click="loadmore">点击加载更多</el-button>
      </div>
    </div>
  </div>

</template>

<style scoped>
</style>