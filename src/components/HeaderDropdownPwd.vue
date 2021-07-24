<template>
  <el-dialog title="修改密码" v-model="dialogFormVisible" >
    <el-form :model="form" ref="form" :rules="rules" label-width="100px">
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="form.newPassword" type="password"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import request from '@/utils/request'
import store from '@/store'

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  components: {},
  data () {
    return {
      dialogFormVisible: this.show,
      form: {
        oldPassword: '',
        newPassword: ''
      },
      rules: {
        newPassword: [
          { required: true, message: '请填写新密码', trigger: 'blur' },
          { min: 2, max: 11, message: '密码长度在 2 到 11 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    // console.log(store.state.user.userName);
  },
  methods: {
    handleOpen (v) {
      this.dialogFormVisible = v
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request.post('/sys/user/update/pwd/' + store.state.user.id, this.form).then(res => {
            this.dialogFormVisible = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
