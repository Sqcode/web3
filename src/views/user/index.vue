<template>
  <!-- <div class="shTable"> -->
    <sh-table :remote="table.remote" :criteria="table.search" :update="table.update">
      <!-- 搜索条件 -->
      <template #search>
        <el-col :span="8">
          <el-form-item label="用户名">
            <el-input v-model="table.search.userName"></el-input>
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
        <import-button
        :file-type="'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
        :import-fileMethod="handleImport" @load-template="loadTemplate"></import-button>
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
      <el-table-column prop="deptName" label="部门"></el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="sort" label="排序"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{ scope.row.status === 1 ? '正常' : '禁用' }}</el-tag>
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
  <!-- </div> -->
</template>

<script>
import shTable from '@/components/shTable'
import request from '@/utils/request'
import ImportButton from 'components/importButton'
import Request from 'utils/request'
export default {
  name: 'User',
  components: { shTable, ImportButton },
  data () {
    return {
      table: {
        search: {
          userName: '',
          phone: ''
        },
        remote: '/user/page',
        update: 0
      },
      cascaderSelected: [],
      props: {
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
  mounted () {
  },
  methods: {
    getList () {
      this.table.update++
    },
    handleInsertClick () {
      this.$router.push({ name: 'user_edit', params: { id: 0 } })
    },
    handleEdit (index, row) {
      this.$router.push({ name: 'user_edit', params: { id: row.id } })
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
          })
          this.dialogFormVisible = false
          this.getList()
        })
      })
    },
    loadTemplate (cb) {
      cb(true)
      return Request.exportFile('/user/model', {}, `用户导入模板${this.$utils.format(new Date(), 'yyyyMMddHHmmss')}`, ).then(data => {
        console.log('user', data)
        cb(false)
      })
    },
    handleImport (file) {
      this.loading = true
      request.uploadFile('/user/parsing', file).then((res) => {
        if (res) {
          this.$message({
            type: 'success',
            message: '导入成功!'
          })
          this.getList()
        }
      }).catch(error => {
        this.$message.error('服务接口异常')
        this.loading = false
      })
    }
  }
}
</script>
