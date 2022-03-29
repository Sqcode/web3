<template>
  <!-- <div class="shTable"> -->
    <sh-table :remote="table.remote" :criteria="table.search" :update="table.update">
      <!-- 搜索条件 -->
      <template #search>
        <el-form-item label="所属菜单">
          <MenuOption @selected="handleMenuSelected"></MenuOption>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="table.search.name"></el-input>
        </el-form-item>
        <el-form-item label="跳转类型">
          <el-select clearable style="width: 100%" v-model="table.search.jumpType" placeholder="请选择">
            <el-option
              v-for="item in jumpTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单级别">
          <el-select clearable style="width: 100%" v-model="table.search.level" placeholder="请选择">
            <el-option label="一级菜单" value="0"></el-option>
            <el-option label="二级菜单" value="1"></el-option>
            <el-option label="三级菜单" value="2"></el-option>
            <el-option label="四级菜单" value="3"></el-option>
            <el-option label="五级菜单" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否加密">
          <el-select clearable style="width: 100%" v-model="table.search.encrypt" placeholder="请选择">
            <el-option label="正常" value="0"></el-option>
            <el-option label="加密" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="加密级别">
          <el-select clearable v-model="table.search.encryptLevel" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in permissionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </template>
      <!-- 功能按钮 -->
      <template #button>
        <el-button type="primary" icon="el-icon-plus" @click="handleInsertClick">添加</el-button>
      </template>

      <!-- 表格字段 -->
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <!-- <el-table-column prop="id" label="序号" width="100"></el-table-column> -->
      <el-table-column prop="" label="图片">
        <template #default="scope">
          <el-image v-if="scope.row.absoluteUrl || scope.row.url"
            style="width: 100%; height: 100px; border-radius: 50%;"
            :src="scope.row.absoluteUrl ? scope.row.absoluteUrl : this.$utils.absoluteUrl(scope.row.url)"
            fit="fill" :preview-src-list="[scope.row.absoluteUrl ? scope.row.absoluteUrl : this.$utils.absoluteUrl(scope.row.url)]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="" label="所属菜单">
        <template #default="scope">
          <span v-if="scope.row.parentName">{{ scope.row.parentName.split(',').reverse().join(' / ') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <!-- <el-table-column prop="typeName" label="菜单类型"></el-table-column> -->
      <el-table-column prop="jumpTypeName" label="跳转">
        <template #default="scope">
          <span v-if="scope.row.jumpType == 2">
            {{ scope.row.jumpTypeName}}
            <span v-if="scope.row.dataJson.value == '/notes/index'"> - 笔记列表</span>
            <span v-else-if="scope.row.dataJson.value == '/note/index'"> - 笔记</span>
          </span>
          <span v-else>{{ scope.row.jumpTypeName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{ scope.row.status === 1 ? '开启' : '禁用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="encrypt" label="是否加密">
        <template #default="scope">
            <el-tag :type="scope.row.encrypt === 0 ? 'success' : 'danger'">{{ scope.row.encrypt === 0 ? '正常' : '加密' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="encryptLevelName" label="加密级别"></el-table-column>
      <el-table-column prop="sort" label="排序"></el-table-column>

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
// import { clone } from '@/utils/util'
import shTable from '@/components/shTable'
import request from '@/utils/request'
import MenuOption from 'components/common/MenuOption'

export default {
  name: 'Menu',
  components: { shTable, MenuOption},
  data () {
    return {
      table: {
        search: {
          name: '',
          parentId: '',
          level: '',
          type: '',
          jumpType: '',
          encrypt: '',
          encryptLevel: ''
        },
        remote: '/menu/page',
        update: 0
      },
      jumpTypeOptions: [],
      permissionOptions: [
        { label: '普通', value: 0 },
        { label: '员工', value: 4 },
        { label: '管理', value: 5 },
        { label: '超级管理', value: 6 }
      ],
    }
  },
  mounted () {
    this.getJumpTypeOptionList()
  },
  methods: {
    handleMenuSelected(selected){
      this.table.search.parentId = selected ? selected[selected.length - 1] : ''
    },
    getJumpTypeOptionList () {
      request.get('/menu/jumpType/option/list').then(res => {
        if (res) {
          this.jumpTypeOptions = res
        }
      })
    },
    getList () {
      this.table.update++
    },
    handleInsertClick () {
      this.$router.push({ name: 'menu_edit', params: { id: 0 } })
    },
    handleEdit (index, row) {
      this.$router.push({ name: 'menu_edit', params: { id: row.id } })
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
          })
          this.dialogFormVisible = false
          this.getList()
        })
      })
    }
  }
}
</script>
