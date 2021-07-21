<template>
  <!-- <div class="shTable"> -->
    <sh-table :remote="table.remote" :criteria="table.search" :update="table.update">
      <!-- 搜索条件 -->
      <template #search>
        <el-col :span="8">
          <el-form-item label="名称">
            <el-input v-model="table.search.name"></el-input>
          </el-form-item>
        </el-col>
      </template>
      <!-- 功能按钮 -->
      <template #button>
        <el-button type="primary" icon="el-icon-plus" @click="handleInsertClick">添加</el-button>
      </template>

      <!-- 表格字段 -->
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="parentName" label="所属部门"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="description" label="介绍"></el-table-column>
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
          @change="handleCascaderChange" :key="cascaderKey">
        </el-cascader>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="介绍" prop="description">
        <el-input type="textarea" :rows="4" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
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
import Dept from 'models/dept'

export default {
  name: 'Dept',
  components: { shTable },
  data () {
    return {
      table: {
        search: {
          name: ''
        },
        remote: '/dept/page',
        update: 0
      },
      dialogFormVisible: false,
      dialogTitle: '',
      form: new Dept(),
      rules: {
        name: [
          { required: true, message: '请填写名称', trigger: 'blur' },
          { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }
        ]
      },
      cascaderSelected: [],
      cascaderKey: 0,
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
      this.form.parentId = this.cascaderSelected ? this.cascaderSelected[this.cascaderSelected.length - 1] : 0
      if (this.form.parentId === this.form.id) {
        this.$message.error('部门不能属于自己')
        return
      }
      this.form.parentPath = this.cascaderSelected ? this.cascaderSelected.join(',') : null

      this.$refs[formName].validate((valid) => {
        if (valid) {
          var url = '/dept/insert'
          if (this.form.id) {
            url = '/dept/update'
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
      this.form = new Dept()
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
        request.post(`/dept/del/${row.id}`).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.dialogFormVisible = false
          this.getList()
          this.cascaderKey++
        })
      })
    }
  }
}
</script>
