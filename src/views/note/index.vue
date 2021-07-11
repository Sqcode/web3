<template>
  <sh-table :remote="table.remote" :criteria="table.search" :update="table.update">
    <!-- 搜索条件 -->
    <template #search>
      <el-col :span="8">
        <el-form-item label="标题">
          <el-input v-model="table.search.title"></el-input>
        </el-form-item>
      </el-col>
    </template>
    <!-- 功能按钮 -->
    <template #button>
      <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">添加</el-button>
    </template>

    <!-- 表格字段 -->
    <el-table-column type="index" label="序号" width="100"></el-table-column>
    <el-table-column prop="" label="所属菜单">
      <template #default="scope">
        <span>{{ scope.row.menuId }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="title" label="标题"></el-table-column>
    <el-table-column prop="content" label="内容" show-overflow-tooltip></el-table-column>
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

  <el-dialog title="新增" v-model="dialogFormVisible">
    <insert ref="insertRef" @getList="getList" :note="note"></insert>
  </el-dialog>

</template>

<script>
import shTable from '@/components/shTable'
import moment from 'moment'
import request from '@/utils/request'
import util from '@/utils/util'
import insert from './insert';
import Note from 'models/note'
export default {
  components: {
    shTable,
    insert
  },
  data() {
    var table = {
      search: {
        title: ''
      },
      remote: '/note/page',
      update: 0
    }
    return {
      table: table,
      dialogFormVisible: false,
      note: new Note()
    }
  },
  mounted() {
    // this.getList ()
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
      this.dialogFormVisible = false
    },
    handleEdit (index, row) {
      this.dialogFormVisible = true
      this.note = util.json_clone(row)
      this.$nextTick(() => {
        this.$refs.insertRef.handleOpen(row)
      })
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          request.post(`/note/del/${row.id}`).then(res => {
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
