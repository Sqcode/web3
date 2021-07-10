<template>
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
      <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">添加</el-button>
    </template>

    <!-- 表格字段 -->
    <el-table-column type="index" label="序号" width="100"></el-table-column>
    <!-- <el-table-column prop="id" label="序号" width="100"></el-table-column> -->
    <el-table-column prop="name" label="name"></el-table-column>
    <el-table-column sortable label="创建时间" prop="createdTime" :formatter="dateFormat">
      <template #slot-scope="scope">
        <span>{{ scope.row.createdTime }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="160">
        <template v-slot="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
  </sh-table>

  <el-dialog title="新增" v-model="dialogFormVisible" >
    <el-form :model="form" ref="form" :rules="rules" label-width="100px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="状态">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
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
import shTable from '@/components/shTable'
import moment from 'moment'
import request from '@/utils/request'
import util from '@/utils/util'

export default {
  components: {shTable},
  data() {
    var table = {
      search: {
        name: ''
      },
      remote: '/menu/page',
      update: 0
    }
    return {
      table: table,
      dialogFormVisible: false,
      form: {
        name: '',
        iconUrl: '',
        url: '',
        status: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: 'status', trigger: 'blur' }
        ],
      }
    }
  },
  mounted() {
  },
  methods: {
    dateFormat (row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    getList () {
      this.table.update++
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var url = '/menu/insert'
          if (this.form.id) {
            url = '/menu/update'
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
    handleEdit (index, row) {
      this.dialogFormVisible = true
      this.form = util.json_clone(row)
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          request.post(`/menu/del/${row.id}`).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.dialogFormVisible = false
            this.getList()
        });
      })
      // .catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   });
      // });
    },
  },
};
</script>
