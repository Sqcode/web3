<template>
  <div class="app-container">
    <sh-table
      :remote="table.remote"
      :criteria="table.search"
      :update="table.update"
    >
      <!-- 搜索条件 -->
      <!-- <el-col slot="search" :span="8">
        <el-form-item label="商品名称">
          <el-input v-model="table.search.goodsName"></el-input>
        </el-form-item>
      </el-col> -->

      <!-- 功能按钮 -->
      <!-- <el-button slot="button" type="primary" icon="el-icon-plus">添加</el-button> -->

      <!-- 表格字段 -->
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="商品名称" prop="goodName"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="库存" prop="stock"></el-table-column>
      <el-table-column label="描述" prop="description"></el-table-column>

      <el-table-column sortable label="创建时间" prop="createdTime" >
        <template #slot-scope="scope">
          <span>{{ scope.row.createdTime }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="160">
        <template v-slot="scope">
          <el-button size="small"	@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </sh-table>
  </div>
</template>
<script>
import shTable from "@/components/shTable";

export default {
  name: "goods",
  components: {
    shTable,
  },
  data() {
    // var table = CACHE.restore({
    var table = {
      search: {
        size: 10,
      },
      remote: `/good-server/goods/listPage`,
      update: 0,
    };
    return {
      table: table,
      Rules: {},
    };
  },
  mounted() {
    // console.log(format(new Date, 'YYYY-MM-DD HH:mm:ss'))
    
  },
  methods: {
    getList: function () {
      //获取列表
      this.table.update++;
    },
    handleEdit(row) {
      
    },
    // 删除
    async handleDelete(row) {
      
    },
  },
};
</script>
