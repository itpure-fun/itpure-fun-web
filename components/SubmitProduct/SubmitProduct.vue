<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
// import 'element-plus/theme-chalk/display.css'
// import router from '@/router';
//visible
const visible = ref(false)
//store
const productStore = useProductStore()
//interface
interface formRule {
  title: string,
  link: string,
  desc: string,
}
//ref
const ruleFormRef = ref<FormInstance>()
//from data
const ruleForm = reactive<formRule>({
  title: '',
  link: '',
  desc: '',
})

//显示弹窗
const show = () => {
  visible.value = true
}

//关闭弹窗
// const close = () => {
//   visible.value = false
// }


//登录 - 提交
const submitForm = async (formEl: FormInstance|undefined) => {
  formEl?.validate(async (valid: any) => {
    if (valid) {
      try {
        //提交
        await productStore.submitProduct({
          title: ruleForm.title,
          link: ruleForm.link,
          desc: ruleForm.desc,
        })
        ElMessage.success('提交成功')
        //关闭弹窗
        visible.value = false
        //重置表单
        ruleFormRef.value?.resetFields()
      } catch (error: any) {
        ElMessage.error(error.message)
      }
    }
  })
}


//注册 - 规则验证
const rules = reactive<FormRules<formRule>>({
  title: [
    {required: true, message: '请输入名称', trigger: 'blur'},
    {max: 20, message: '长度最大20', trigger: 'blur' },
  ],
  link: [
    {required: true, message: '请输入链接', trigger: 'blur'},
    {type: 'url', message: '链接格式错误', trigger: 'blur' },
  ],
  desc: [
    {required: false, message: '请填写描述', trigger: 'blur'},
    {max: 255, message: '描述长度最大255', trigger: 'blur'},
  ]
})

defineExpose({
  show
})
</script>

<template>
  <!-- 提交产品弹窗 -->
  <div class="sub-dialog">
    <el-dialog v-model="visible" title="" style="border-radius: 1rem; padding: 2rem;" >
      <el-divider><div class="text-xl font-normal">提交产品</div></el-divider>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm mt-10"
      >
        <el-form-item label="名称" prop="title" label-position="top">
          <el-input v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="链接" prop="link" label-position="top">
          <el-input
            v-model="ruleForm.link"
          />
        </el-form-item>
        <el-form-item label="描述" prop="desc" label-position="top">
          <el-input v-model="ruleForm.desc" type="textarea" :rows="4"/>
        </el-form-item>
        <el-form-item>
          <div class="w-full flex justify-end">
            <el-button type="warning" @click="submitForm(ruleFormRef)" class="w-full" size="large">
              提交
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped>
:deep(.el-dialog){
  @apply c-xs:w-11/12 c-sm:w-[400px] c-md:w-[500px]
}
</style>