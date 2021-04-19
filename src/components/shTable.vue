
<template>
  <div>
    <el-form class="p20" style="width: 95%" :model="search" label-width="80px">
      <el-row :gutter="20">
        <slot name="search">
          <!-- 搜索条件 -->
        </slot>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-button type="primary" icon="el-icon-search" @click="getList()">搜索</el-button>
          <slot name="button">
			  <!-- 功能按钮 -->
		  </slot>
        </el-col>
      </el-row>
    </el-form>
    <slot name="tip">
		<!-- 温馨提示 -->
	</slot>
	<!-- 数据表格 -->
    <el-table
	  v-loading="loading"
	  element-loading-text="拼命加载中"
	  ref="defaultTable"
	  border
      :data="tableData"
      :default-sort="search"
      @sort-change="handleSortChange"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      @expand-change="handleExpandChange">
      <slot>
    	<!-- 表格字段 -->
      </slot>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="search.current"
      :page-sizes="[2, 5, 10, 30, 60, 80, 100]"
      :page-size="search.size"
      :total="totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
// import table from '@/components/table/table'
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
		update: Number,
    },
    data: function () {
        var sort = this.sort
        var search = {
            current: 1,
            size: 10,
            orderBy: ''
        }
        // search = CACHE.restore(search, this.remote)
        return {
            search: search,
            loading: true,
            tableData: [],
            totalCount: null        }
    },
    watch: {
        update: function (newVal, oldVal) {
			console.log(newVal, oldVal)
            var name = this.method || 'getList'
            var method = this[name]
            if (typeof method === 'function') {
                method()
            }
            else {
                console.log('Can\'t invoke method \'' + name + '\'')
            }
        }
    },
    mounted: function () {
		// console.log($(`#btn`))
        this.getList(1)
    },
    methods: {
        async getList (value) {

            var criteria = Object.assign(this.search, this.criteria)
            console.log(criteria)
            // CACHE.reserve(criteria, this.remote)
// 			const res =  await request({
// 				url: this.remote,
// 				method: 'post',
// 				data: criteria
// 			})
//  console.log(res)
			const {data} =  await request({
				url: this.remote,
				method: 'post',
				data: criteria
			})
            console.log(data)
			this.tableData = data.records || []
            this.totalCount = data.total || null
            this.loading = false
			// console.log(this.tableData)
            // this.$emit('search-after')
        },
        handleSizeChange: function (val) {//修改显示条数
            this.search.size = val
            this.getList()
        },
        handleCurrentChange: function (val) {//修改页数
            this.search.current = val
            this.getList()
        },
        handleSortChange: function (column, prop, order) {//排序
		console.log(column, prop, order)
            // this.search.orderBy = UTILS.toSqlOrder(column)
			this.search.orderBy = column.prop + ' ' + column.order
            this.getList()
        },
        handleSelectionChange: function (rows) {
            this.$emit('selection', rows)
        },
        handleRowClick: function (row, event, column) {
            this.$emit('row-click', row, event, column)
        },
        handleExpandChange: function (row, expandedRows, expanded) {
            this.$emit('expand-change', row, expandedRows, expanded)
        },
    }
}
// })

</script>
<!-- 封装的一个table 
1. 插槽search：搜索输入框
2. 插槽button：搜索按钮/其他按钮
3. 插槽tip：放一些文字提示
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