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
            :src="scope.row.avatarUrl"
            fit="fill" :preview-src-list="[scope.row.avatarUrl]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="deptName" label="部门"></el-table-column>
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
      dialogFormVisible: false,
      dialogTitle: '',
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
    handleCascaderChange (node) {

    },
    getList () {
      this.table.update++
    },
    submitForm (formName) {
      this.form.deptId = this.cascaderSelected ? this.cascaderSelected[this.cascaderSelected.length - 1] : ''
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var url = '/user/insert'
          if (this.form.id) {
            url = '/user/update'
          }
          request.post(url, this.form).then(res => {
            this.dialogFormVisible = false
            this.getList()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleInsertClick () {
      this.dialogFormVisible = true
      this.dialogTitle = '新增'
      this.form = new User()
    },
    handleEdit (index, row) {
      this.dialogFormVisible = true
      this.dialogTitle = '编辑'
      this.form = clone(row)
      if (row.parentPath) {
        this.cascaderSelected = row.parentPath.split(',').map(Number)
      }
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
          this.getList
        }
      }).catch(error => {
        this.$message.error('服务接口异常')
        this.loading = false
      })
    }
  }
}
</script>
