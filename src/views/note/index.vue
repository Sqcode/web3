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
      <el-button type="primary" icon="el-icon-plus" @click="handleInsertClick">添加</el-button>
    </template>

    <!-- 表格字段 -->
    <el-table-column type="index" label="序号" width="100"></el-table-column>
    <el-table-column prop="menuName" label="所属菜单">
      <template #default="scope">
        <span v-if="scope.row.menuName">{{ scope.row.menuName.split(',').reverse().join(' / ') }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="parentName" label="所属笔记"></el-table-column>
    <el-table-column prop="title" label="标题"></el-table-column>
    <el-table-column prop="sort" label="排序"></el-table-column>
    <el-table-column prop="content" label="内容" show-overflow-tooltip></el-table-column>
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

  <el-dialog :title="dialogTitle" v-model="dialogFormVisible" :close-on-click-modal="false" fullscreen>
    <form-dialog ref="insertRef" @getList="getList" :note="note"></form-dialog>
  </el-dialog>

</template>

<script>
import shTable from '@/components/shTable'
import request from '@/utils/request'
import { clone } from '@/utils/util'
import formDialog from './dialog';
import Note from 'models/note'
export default {
  components: {
    shTable,
    formDialog
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
      dialogTitle: '',
      note: new Note()
    }
  },
  mounted() {
    // this.getList ()
  },
  methods: {
    getList () {
      this.table.update++
      this.dialogFormVisible = false
    },
    handleInsertClick(){
      this.dialogFormVisible = true
      this.dialogTitle = '新增'
      this.note = new Note()
      this.$nextTick(() => {
        this.$refs.insertRef.handleOpen(this.note)
      })
    },
    handleEdit (index, row) {
      this.dialogFormVisible = true
      this.dialogTitle = '编辑'
      this.note = clone(row)
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
