<template>
  <!-- <div class="shTable"> -->
    <sh-table :remote="table.remote" :criteria="table.search" :update="table.update" @selection="handleSelectedChange">
      <!-- 搜索条件 -->
      <template #search>
        <el-form-item label="用户名">
          <el-input v-model="table.search.nickName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="table.search.phone"></el-input>
        </el-form-item>
      </template>
      <!-- 功能按钮 -->
      <template #button>
        <!-- <el-button type="primary" icon="el-icon-plus" @click="handleInsertClick">添加</el-button> -->
        <el-button type="primary" @click="handleBatchUpdatePermission">批量修改权限</el-button>
      </template>

      <!-- 表格字段 -->
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="" label="头像">
        <template #default="scope">
          <el-image v-if="scope.row.avatarUrl"
            style="width: 100%; height: 100px"
            :src="this.$utils.absoluteUrl(scope.row.avatarUrl)"
            fit="fill" :preview-src-list="[this.$utils.absoluteUrl(scope.row.avatarUrl)]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="用户名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="typeName" label="类型"></el-table-column>
      <el-table-column prop="permissionName" label="权限"></el-table-column>
      <!-- <el-table-column prop="gender" label="性别">
        <template #default="scope">
            {{ scope.row.gender === 0 ? '未知' : scope.row.gender === 1 ? '男' : '女'}}
        </template>
      </el-table-column> -->
      <el-table-column prop="status" label="状态">
        <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{ scope.row.status === 1 ? '正常' : '禁用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="loginTime" label="最近登录时间" width="175">
        <template #default="scope">
          {{ this.$utils.format(scope.row.loginTime, 'yyyy-MM-dd HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间" width="175">
        <template #default="scope">
          {{ this.$utils.format(scope.row.createdTime, 'yyyy-MM-dd HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" fixed="right">
          <template v-slot="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </sh-table>
    <el-dialog title="批量更新用户权限" v-model="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" >
        <el-form-item label="权限" prop="permission">
          <el-select v-model="form.permission" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in permissionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible=false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
</template>

<script>
import shTable from '@/components/shTable'
import request from '@/utils/request'
export default {
  name: 'UserProfile',
  components: { shTable },
  data () {
    return {
      table: {
        search: {
          nickName: '',
          phone: ''
        },
        remote: '/userProfile/page',
        update: 0
      },
      typeOptions: [
        { label: '普通', value: 0 },
        { label: '体验', value: 1 },
        { label: '管理员', value: 2 },
        { label: '超级管理员', value: 99 }
      ],
      permissionOptions: [
        { label: '普通', value: 0 },
        { label: '员工', value: 4 },
        { label: '管理', value: 5 },
        { label: '超级管理', value: 6 }
      ],
      checked: [],
      form: {
        ids: '',
        permission: 0
      },
      rules: {
        permission: [
          { required: true, message: '请选择权限', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false
    }
  },
  mounted () {
  },
  methods: {
    handleBatchUpdatePermission () {
      if (this.checked.length == 0) {
        this.$message({
          type: 'warning',
          message: '请先选择用户，不支持分页选择!'
        })
        return
      }
      this.dialogFormVisible=true
    },
    handleSelectedChange(rows) {
      this.checked = rows.map(v => v.id)
    },
    submitForm (formName) {
      this.form.ids = this.checked.join(',')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var url = '/userProfile/update/permission'
          request.post(url, this.form).then(res => {
            this.getList(), this.dialogFormVisible = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getList () {
      this.table.update++
    },
    // handleInsertClick () {
    //   this.$router.push({ name: 'user_edit', params: { id: 0 } })
    // },
    handleEdit (index, row) {
      this.$router.push({ name: 'userProfile_edit', params: { id: row.id } })
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.post(`/userProfile/del/${row.id}`).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      })
    }
  }
}
</script>
