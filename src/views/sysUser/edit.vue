<template>
  <div id="edit-form">
    <el-form :model="form" ref="form" :rules="rules" label-width="100px">
      <el-form-item label="登录名" prop="loginName">
        <el-input v-model="form.loginName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatarUrl">
        <UploadTemplateManual ref="upload" @success="handleSuccess" :url="form.avatarUrl" />
      </el-form-item>
      <!-- <el-form-item label="头像" prop="avatarUrl">
        <el-input v-model="form.avatarUrl"></el-input>
        <span style="color: red;">绝对路径，可以直接访问的网络图片</span>
      </el-form-item> -->
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
          <el-radio :label="2" disabled>未知</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>

    </el-form>
    <el-footer>
      <el-button type="warning" @click="$goBack">返 回</el-button>
      <el-button type="primary" @click="submitForm('form')">提 交</el-button>
    </el-footer>
  </div>
</template>
<script>
import SysUser from 'models/sysUser'
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
      request.get('/sys/user/' + id).then(
        response => {
          this.form = clone(response)
        },
        err => {
          reject(err)
        }
      )
    }
  },
  data () {
    return {
      form: new SysUser(),
      rules: {
        loginName: [
          { required: true, message: '请填写登录名', trigger: 'blur' },
          { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { min: 2, max: 64, message: '密码长度在 2 到 64 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    // async getOne() {
    //   const response = await new Promise(resolve => {
    //     setTimeout(() => {
    //       resolve("async await test...");
    //     }, 1000);
    //   });
    //   console.log(response);
    // },
    handleSuccess(imagePath) {
      // console.log('parent: ', imagePath);
      this.form.avatarUrl = imagePath
      this.$nextTick(() => {
        // console.log('request');
        var url = '/sys/user/insert'
        if (this.form.id) {
          url = '/sys/user/update'
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
  }
</style>
