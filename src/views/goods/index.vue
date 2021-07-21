<template>
  <div class="app-container">
    <!-- <el-upload
            class="upload-demo"
            action="http://localhost:8002/goods/upload"
            multiple
        >
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload> -->
    <sh-table :remote="table.remote" :criteria="table.search" :update="table.update">
      <!-- 搜索条件 -->
      <template #search>
        <el-col :span="8">
          <el-form-item label="商品名称">
            <el-input v-model="table.search.goodsName"></el-input>
          </el-form-item>
        </el-col>
      </template>
      <!-- 功能按钮 -->
      <template #button>
        <!-- <el-button  type="primary" icon="el-icon-plus">添加</el-button> -->
        <!-- <el-button size="small" type="primary">点击上传</el-button> -->
      </template>

      <!-- 表格字段 -->
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="商品名称" prop="goodsName"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="库存" prop="stock"></el-table-column>
      <el-table-column label="描述" prop="description"></el-table-column>
      <el-table-column prop="createdTime" label="创建时间" width="175">
        <template #default="scope">
          {{ this.$utils.format(scope.row.createdTime, 'yyyy-MM-dd HH:mm:ss') }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="160">
        <template v-slot="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </sh-table>
  </div>
</template>
<script>
import shTable from '@/components/shTable'

export default {
  name: 'Goods',
  components: {
    shTable
  },
  data () {
    // var table = CACHE.restore({
    var table = {
      search: {
        goodsName: ''
      },
      remote: '/goods-server/goods/listPage',
      update: 0
    }
    return {
      table: table,
      Rules: {},
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      },
      {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }
      ]
    }
  },
  mounted () {},
  methods: {
    // dateFormat: function (row, column) {
    //   var date = row[column.property]
    //   if (date === undefined) {
    //     return ''
    //   }
    //   return moment(date).format('YYYY-MM-DD HH:mm:ss')
    // },
    getList: function () {
      // 获取列表
      this.table.update++
    },
    handleEdit (row) {},
    // 删除
    async handleDelete (row) {}
  }
}
</script>
