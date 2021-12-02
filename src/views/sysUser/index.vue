<template>
  <!-- <div class="shTable"> -->
    <sh-table :remote="table.remote" :criteria="table.search" :update="table.update">
      <!-- 搜索条件 -->
      <template #search>
        <el-form-item label="登录名">
          <el-input v-model="table.search.loginName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="table.search.phone"></el-input>
        </el-form-item>
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
            :src="this.$utils.absoluteUrl(scope.row.avatarUrl)"
            fit="fill" :preview-src-list="[this.$utils.absoluteUrl(scope.row.avatarUrl)]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="loginName" label="登录名"></el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="type" label="类型">
        <template #default="scope">
          <span v-for="item in typeOptions">
            <span v-if="item.value === scope.row.type">{{item.label}}</span>
          </span>
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
</template>

<script>
import { clone } from '@/utils/util'
import shTable from '@/components/shTable'
import request from '@/utils/request'
import SysUser from 'models/sysUser'

export default {
  name: 'SysUser',
  components: { shTable },
  data () {
    return {
      table: {
        search: {
          loginName: '',
          phone: ''
        },
        remote: '/sys/user/page',
        update: 0
      },
      typeOptions: [
        { label: '管理员', value: 0 },
        { label: '超级管理员', value: 1 }
      ]
    }
  },
  mounted () {
  },
  methods: {
    getList () {
      this.table.update++
    },
    handleInsertClick () {
      this.$router.push({ name: 'sys_user_edit', params: { id: 0 } })
    },
    handleEdit (index, row) {
      this.$router.push({ name: 'sys_user_edit', params: { id: row.id } })
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.post(`/sys/user/del/${row.id}`).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.dialogFormVisible = false
          this.getList()
        })
      })
    }
  }
}
</script>
