<template>
  <div id="edit-form">
    <el-form :model="form" ref="form" :rules="rules" label-width="100px">
      <el-form-item label="头像" prop="avatarUrl">
        <UploadTemplateManual v-if="form.avatarUrl" ref="upload" :prefix="'user/'" :url="form.avatarUrl" />
        <UploadTemplateManual v-else ref="upload" :prefix="'user/'" :url="form.avatarUrl" />
      </el-form-item>
      <el-form-item label="所属部门" prop="deptId" >
        <Dept @selected="handleDeptSelected"></Dept>
      </el-form-item>
      <el-form-item label="所属角色" prop="roleId">
          <el-select clearable filterable style="width: 100%" v-model="form.roleId" placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
      <el-form-item label="是否可见" prop="isShow">
        <el-radio-group v-model="form.isShow">
          <el-radio :label="1">展示</el-radio>
          <el-radio :label="0">掩藏</el-radio>
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
import Dept from 'components/common/Dept'

export default {
  props: {
  },
  components: {
    UploadTemplateManual, Dept
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
          if (response.deptId) {
            this.getRoleList(response.deptId);
          } else {
            this.getRoleList('');
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
      roles: [],
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
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    handleDeptSelected(selected){
      this.form.deptId = selected ? selected[selected.length - 1] : ''
      this.getRoleList (this.form.deptId)
    },
    handleCascaderChange (node) {

    },
    getRoleList (deptId) {
      request.get('/role/option/list?deptId=' + deptId).then(res => {
        const ns = res.map(v => ({
          label: v.label,
          value: v.value
        }))
        this.roles = ns
      })
    },
    submitForm (formName) {
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
