<template>
  <div class="shTable" >
    <div class="shTable-div-form">
      <el-form :model="search" label-width="80px">
        <slot name="search">
          <!-- 搜索条件 -->
        </slot>
        <el-button type="primary" icon="el-icon-search" @click="getList()">搜索</el-button>
        <slot name="button">
          <!-- 功能按钮 -->
        </slot>
      </el-form>
      <slot name="tip">
        <!-- 温馨提示 -->
      </slot>
    </div>
    <!-- 数据表格 -->
    <div class="div-table">
      <el-table height="100%" v-loading="loading" element-loading-text="拼命加载中" ref="defaultTable" border :data="tableData"
        :default-sort="search" @sort-change="handleSortChange" @selection-change="handleSelectionChange"
        @row-click="handleRowClick" @expand-change="handleExpandChange">
        <slot>
          <!-- 表格字段 -->
        </slot>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.current"
      :page-sizes="[10, 30, 60, 80, 100]" :page-size="search.size"
      layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
  import { format } from '@/utils/util'
  import request from '@/utils/request'

  export default {
    // Vue.component('shTable', {
    //     template: 'shTable',
    name: 'shTable',
    props: {
      remote: {
        type: String,
        required: true
      },
      // 搜索条件
      criteria: Object,
      // 默认排序
      sort: Object,
      // 请求方法
      method: String,
      // 请求计数
      update: Number
    },
    data() {
      // var sort = this.sort
      var search = {
        current: 1,
        size: 10,
        orders: [{
          column: 'created_time',
          asc: false
        }]
      }
      // search = CACHE.restore(search, this.remote)
      return {
        search: search,
        loading: true,
        tableData: [],
        totalCount: 0
      }
    },
    watch: {
      update(newVal, oldVal) {
        // console.log(newVal, oldVal)
        var name = this.method || 'getList'
        var method = this[name]
        if (typeof method === 'function') {
          method()
        } else {
          console.log("Can't invoke method '" + name + "'")
        }
      }
    },
    mounted() {
      // console.log($(`#btn`))
      this.getList()
    },
    methods: {
      getList() {
        var criteria = Object.assign(this.search, this.criteria)
        request.post(this.remote, criteria).then(res => {
          // res.records.forEach(e => {
          //   e.createdTime = format(e.createdTime, 'yyyy-MM-dd HH:mm:ss')
          // });
          // console.log('tableData', res.records);
          this.tableData = res.records || []
          this.totalCount = res.total || 0
          this.loading = false
        });
      },

      // async getList (value) {
      //   var criteria = Object.assign(this.search, this.criteria)
      //   // console.log(criteria)
      //   // CACHE.reserve(criteria, this.remote)
      //   const { data } = await request({
      //     url: this.remote,
      //     method: 'post',
      //     data: criteria
      //   })
      //   // console.log(data)
      //   this.tableData = data.records || []
      //   this.totalCount = data.total || null
      //   this.loading = false
      //   // this.$emit('search-after')
      // },
      handleSizeChange(val) {// 修改显示条数
        this.search.size = val
        this.getList()
      },
      handleCurrentChange(val) {// 修改页数
        this.search.current = val
        this.getList()
      },
      handleSortChange(column, prop, order) {// 排序
        console.log(column, prop, order)
        this.search.orderBy = column.prop + ' ' + column.order
        this.getList()
      },
      handleSelectionChange(rows) {
        this.$emit('selection', rows)
      },
      handleRowClick(row, event, column) {
        this.$emit('row-click', row, event, column)
      },
      handleExpandChange(row, expandedRows, expanded) {
        this.$emit('expand-change', row, expandedRows, expanded)
      }
    }
  }
  // })
</script>
<style lang="scss" scoped>
  .shTable {
    height: 100%;
    // height: calc(100% - 60px);
    width: 98%;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
  .div-table {
    flex:1;
    overflow:auto
  }
</style>
<!-- 封装的一个table
1. 具名插槽search：搜索输入框
2. 具名插槽button：搜索按钮/其他按钮
3. 具名插槽tip：放一些文字提示
4. 表数据
  1. 排序-事件
  2. 多选-事件
  3. 行点击-事件
  4. 扩展行-事件
5. 分页
  1. 切换页面
未完善
-->
<!--
  <sh-table :remote="table.remote" :criteria="table.search" :update="table.update">
      搜索条件
      <el-col slot="search"></el-col>
      功能按钮
      <el-button slot="button"></el-button>
      表格字段
      <el-table-column label="label" prop="prop"></el-table-column>
    </sh-table>
 -->
