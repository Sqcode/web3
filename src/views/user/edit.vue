<template>
  <div id="edit-form">
    <el-form :model="form" ref="form" :rules="rules" label-width="100px">
      <el-form-item label="头像" prop="avatarUrl">
        <UploadTemplateManual ref="upload" @success="handleSuccess" :prefix="'user/'" :url="form.avatarUrl" />
      </el-form-item>
      <el-form-item label="所属部门" prop="deptId" >
        <el-cascader style="width: 100%"
          clearable
          filterable
          :props="props"
          v-model="cascaderSelected"
          @change="handleCascaderChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number style="width: 100%" type="number" v-model.number="form.sort" :min="1" label="排序"></el-input-number>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
          <el-radio :label="2" disabled>未知</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-footer>
      <el-button type="warning" @click="$goBack">返 回</el-button>
      <el-button type="primary" @click="submitForm('form')">提 交</el-button>
    </el-footer>
  </div>
</template>
<script>
import User from 'models/user'
import request from '@/utils/request'
import UploadTemplateManual from 'components/UploadTemplateManual';
import { clone } from '@/utils/util'

export default {
  props: {
  },
  components: {
    UploadTemplateManual
  },
  created () {
    var id = this.$route.params.id
    if (id != 0) {
      request.get('/user/' + id).then(
        response => {
          // console.log(response);
          this.form = clone(response)
          if (response.parentPath) {
            this.cascaderSelected = response.parentPath.split(',').map(Number)
          }
        },
        err => {
          reject(err)
        }
      )
    }
  },
  data () {
    return {
      form: new User(),
      rules: {
        userName: [
          { required: true, message: '请填写用户名', trigger: 'blur' },
          { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请填写手机', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号11位', trigger: 'blur' }
        ]
      },
      cascaderSelected: [],
      props: {
        expandTrigger: 'hover',
        checkStrictly: true,
        lazy: true,
        lazyLoad (node, resolve) {
          const { value, label, level } = node
          if (level === 0) {
            request.get('/dept/option/list?parentId=0').then(res => {
              resolve(res)
            })
          } else {
            request.get(`/dept/option/list?parentId=${value}`).then(res => {
              resolve(res)
            })
          }
        }
      }
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    handleCascaderChange (node) {

    },
    handleSuccess(imagePath) {
      if (imagePath) {
        this.form.avatarUrl = imagePath
      }
      this.$nextTick(() => {
        var url = '/user/insert'
        if (this.form.id) {
          url = '/user/update'
        }
        request.post(url, this.form).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功！'
          })
          this.$goBack()
        })
      })
    },
    submitForm (formName) {
      this.form.deptId = this.cascaderSelected ? this.cascaderSelected[this.cascaderSelected.length - 1] : ''
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.upload.submit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  #edit-form {
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    overflow: auto;
  }
</style>
