<template>
  <!-- <div class="shTable"> -->
    <sh-table :remote="table.remote" :criteria="table.search" :update="table.update">
      <!-- 搜索条件 -->
      <template #search>
        <el-col :span="8">
          <el-form-item label="登录名">
            <el-input v-model="table.search.loginName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号">
            <el-input v-model="table.search.phone"></el-input>
          </el-form-item>
        </el-col>
      </template>
      <!-- 功能按钮 -->
      <template #button>
        <el-button type="primary" icon="el-icon-plus" @click="handleInsertClick">添加</el-button>
      </template>

      <!-- 表格字段 -->
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="" label="头像">
        <template #default="scope">
          <el-image v-if="scope.row.avatarUrl"
            style="width: 100%; height: 100px"
            :src="scope.row.avatarUrl"
            fit="fill" :preview-src-list="[scope.row.avatarUrl]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="loginName" label="登录名"></el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="createdTime" label="创建时间" width="175">
        <template #default="scope">
          {{ this.$utils.format(scope.row.createdTime, 'yyyy-MM-dd HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
          <template v-slot="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </sh-table>
  <!-- </div> -->
  <el-dialog :title="dialogTitle" v-model="dialogFormVisible" >
    <el-form :model="form" ref="form" :rules="rules" label-width="100px">
      <el-form-item label="登录名" prop="loginName">
        <el-input v-model="form.loginName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
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
      <el-form-item label="头像" prop="avatarUrl">
        <el-input v-model="form.avatarUrl"></el-input>
        <span style="color: red;">绝对路径，可以直接访问的网络图片</span>
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
import { clone } from '@/utils/util'
import shTable from '@/components/shTable'
import request from '@/utils/request'
import User from 'models/user'

export default {
  components: {shTable},
  data() {
    return {
      table: {
        search: {
          loginName: '',
          phone: '',
        },
        remote: '/user/page',
        update: 0
      },
      dialogFormVisible: false,
      dialogTitle: '',
      form: new User(),
      rules: {
        loginName: [
          { required: true, message: '请填写登录名', trigger: 'blur' },
          { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { min: 2, max: 11, message: '密码长度在 2 到 11 个字符', trigger: 'blur' }
        ],
      },
    }
  },
  mounted() {
  },
  methods: {
    getList () {
      this.table.update++
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var url = '/user/insert'
          if (this.form.id) {
            url = '/user/update'
          }
          request.post(url, this.form).then(res => {
            this.dialogFormVisible = false
            this.getList()
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleInsertClick(){
      this.dialogFormVisible = true
      this.dialogTitle = '新增'
      this.form = new User()
    },
    handleEdit (index, row) {
      this.dialogFormVisible = true
      this.dialogTitle = '编辑'
      this.form = clone(row)
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          request.post(`/user/del/${row.id}`).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.dialogFormVisible = false
            this.getList()
        });
      })
    },
  },
};
</script>
