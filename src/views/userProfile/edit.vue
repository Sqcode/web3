<template>
  <div id="edit-form">
    <el-form :model="form" ref="form" :rules="rules" label-width="100px">
      <el-form-item label="头像" prop="avatarUrl">
        <UploadTemplateManual v-if="form.avatarUrl" ref="upload" :prefix="'userProfile/'" :url="form.avatarUrl" />
        <UploadTemplateManual v-else ref="upload" :prefix="'userProfile/'" :url="form.avatarUrl" />
      </el-form-item>
      <el-form-item label="用户名" prop="nickName">
        <el-input v-model="form.nickName"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="用户类型" prop="type">
        <el-select clearable style="width: 100%" v-model="form.type" placeholder="请选择">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限" prop="permission">
        <el-select v-model="permission" multiple clearable placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in permissionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
          <el-radio :label="0" disabled>未知</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁止登录</el-radio>
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
import UserProfile from 'models/userProfile'
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
      request.get('/userProfile/' + id).then(
        response => {
          console.log(response);
          this.form = clone(response)
          if (response.permission) {
            this.permission = response.permission.split(',').map(Number)
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
      form: new UserProfile(),
      rules: {
        nickName: [
          { required: true, message: '请填写用户名', trigger: 'blur' },
          { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }
        ],
        // phone: [
        //   { required: true, message: '请填写手机', trigger: 'blur' },
        //   { min: 11, max: 11, message: '手机号11位', trigger: 'blur' }
        // ]
      },
      typeOptions: [
        { label: '普通', value: 0 },
        { label: 'SVIP', value: 1 },
        { label: 'VIP', value: 2 }
      ],
      permission: [],
      permissionOptions: [
        { label: '普通', value: 0 },
        { label: '超级管理员', value: 1 },
        { label: '管理员', value: 2 },
        { label: '体验更多内容', value: 3 },
        { label: '访问加密', value: 4 },
        { label: '访问加密文件二级，未使用', value: 5 },
        { label: '访问加密文件三级，未使用', value: 6 }
      ]
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    submitForm (formName) {
      this.form.permission = this.permission.join(',')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$refs.upload.isChange) {
            // console.log(this.$refs.upload.isChange);
            const response = this.$refs.upload.submit()
            response.then((imagePath) => {
              // console.log(imagePath);
              if (imagePath) {
                this.form.avatarUrl = imagePath
              }
              this.handleSuccess()
            }).catch((err) => {
              console.log('oss 异常')
            });
          } else {
            this.handleSuccess()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSuccess () {
      // console.log('request');
      var url = '/userProfile/insert'
      if (this.form.id) {
        url = '/userProfile/update'
      }
      request.post(url, this.form).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功！'
        })
        this.$goBack()
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
