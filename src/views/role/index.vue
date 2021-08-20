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
      <!-- <el-table-column prop="deptName" label="所属部门"></el-table-column> -->
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="description" label="介绍"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{ scope.row.status === 1 ? '开启' : '禁用' }}</el-tag>
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
  <el-dialog :title="dialogTitle" v-model="dialogFormVisible" >
    <el-form :model="form" ref="form" :rules="rules" label-width="100px">
      <!-- <el-form-item label="所属部门" prop="deptId" >
        <Dept @selected="handleDeptSelected" :key="cascaderKey" :defaultSelected="cascaderSelected"></Dept>
      </el-form-item> -->
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
import Role from 'models/role'
// import Dept from 'components/common/Dept'

export default {
  name: 'Role',
  components: { shTable },
  data () {
    return {
      table: {
        search: {
          name: ''
        },
        remote: '/role/page',
        update: 0
      },
      dialogFormVisible: false,
      dialogTitle: '',
      form: new Role(),
      rules: {
        name: [
          { required: true, message: '请填写名称', trigger: 'blur' },
          { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }
        ]
      },
      cascaderSelected: [],
      cascaderKey: 0
    }
  },
  mounted () {
  },
  methods: {
    handleDeptSelected(selected){
      this.form.deptId = selected ? selected[selected.length - 1] : ''
      this.form.deptIdPath = selected ? selected.join(',') : null
    },
    handleCascaderChange (node) {

    },
    getList () {
      this.table.update++
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var url = '/role/insert'
          if (this.form.id) {
            url = '/role/update'
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
      this.form = new Role()
    },
    handleEdit (index, row) {
      this.dialogFormVisible = true
      this.dialogTitle = '编辑'
      this.form = clone(row)
      // console.log(row.deptIdPath);
      if (row.deptIdPath) {
        this.cascaderSelected = row.deptIdPath.split(',').map(Number)
        this.cascaderKey++
      }
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.post(`/role/del/${row.id}`).then(res => {
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
