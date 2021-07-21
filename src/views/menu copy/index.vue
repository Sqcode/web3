<template>
  <!-- <div class="table"> -->
    <!-- <div class="table-div"> -->
      <div style="margin-bottom: 10px;">
        <el-button type="primary">按钮</el-button>
      </div>
      <!-- <div style="flex:1; overflow:auto"> -->
        <el-table :data="tableData" border v-loading="loading">
          <el-table-column type="index" label="序号" width="100"></el-table-column>
          <el-table-column prop="name" label="name"></el-table-column>
        </el-table>
        <div>
          <el-pagination small class="goods-table-pagination"
            v-model:page-size="pagination.pageSize"
            :total="pagination.totalCount"
            v-model:current-page="pagination.currentPage"
            pager-count="5"
            @current-change="pageChange" layout="total, prev, pager, next, jumper">
          </el-pagination>
        </div>
      <!-- </div> -->

    <!-- </div> -->
  <!-- </div> -->
</template>

<script>
import {
  ElMessage
} from 'element-plus'
import request from '@/utils/request'
import Pagination from 'models/pagination'

export default {
  components: {},
  data () {
    return {
      tableData: [],
      pagination: new Pagination(),
      loading: false,
      update: 0,
      search: {
        size: 10,
        current: 1
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {

    getList () {
      request.post('menu/page', this.search).then(res => {
        this.tableData = res.records || []
        this.pagination.totalCount = res.total || null
        this.pagination.currentPage = res.current
      })
    },
    pageChange () {
      this.search.size = this.pagination.pageSize
      this.search.current = this.pagination.currentPage
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
  // .table {
  //   height: calc(100% - 60px);
  // }
  // .table-div {
  //   display: flex;
  //   height: 100%;
  //   flex-direction: column;
  // }
</style>
<style lang="scss">
  // .table-div {
  //   .el-tabs__content {
  //     height: calc(100% - 55px);

  //     .el-tab-pane {
  //       height: 100%;
  //     }
  //   }
  // }
</style>
