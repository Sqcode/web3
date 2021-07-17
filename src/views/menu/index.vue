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
        <el-col :span="8">
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
        </el-col>

        <el-col :span="12">
          <el-form-item label="菜单级别">
            <el-select clearable style="width: 100%" v-model="table.search.level" placeholder="请选择">
              <el-option label="一级菜单" value="0"></el-option>
              <el-option label="二级菜单" value="1"></el-option>
              <el-option label="三级菜单" value="2"></el-option>
              <el-option label="四级菜单" value="3"></el-option>
              <el-option label="五级菜单" value="4"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="父菜单">
            <el-cascader style="width: 100%"
              clearable
              filterable
              :props="props"
              v-model="cascaderSearchSelected"
              @change="handleCascaderSearchChange">
            </el-cascader>
          </el-form-item> -->
        </el-col>
      </template>
      <!-- 功能按钮 -->
      <template #button>
        <el-button type="primary" icon="el-icon-plus" @click="handleInsertClick">添加</el-button>
      </template>

      <!-- 表格字段 -->
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <!-- <el-table-column prop="id" label="序号" width="100"></el-table-column> -->
      <el-table-column prop="" label="所属菜单">
        <template #default="scope">
          <span v-if="scope.row.parentName">{{ scope.row.parentName.split(',').reverse().join(' / ') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="图片">
        <template #default="scope">
          <el-image v-if="scope.row.absoluteUrl"
            style="width: 100%; height: 100%"
            :src="scope.row.absoluteUrl"
            fit="fill" :preview-src-list="[scope.row.absoluteUrl]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="sort" label="排序"></el-table-column>
      <el-table-column prop="typeName" label="菜单类型"></el-table-column>
      <el-table-column prop="jumpTypeName" label="跳转类型"></el-table-column>
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
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number style="width: 100%" type="number" v-model.number="form.sort" :min="1" label="小程序菜单排序"></el-input-number>
      </el-form-item>
      <el-form-item label="图标地址" prop="absoluteUrl">
        <el-input v-model="form.absoluteUrl"></el-input>
        <span style="color: red;">绝对路径，可以直接访问的网络图片</span>
      </el-form-item>
      <el-form-item label="所属菜单" prop="parentId">
        <el-cascader style="width: 100%"
          clearable
          filterable
          :props="props"
          v-model="dialogCascaderSelected"
          @change="handleDialogCascaderChange"
          :key="cascaderKey">
        </el-cascader>
      </el-form-item>
      <el-form-item label="菜单类型" prop="type">
        <el-select clearable style="width: 100%" v-model="form.type" placeholder="请选择">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="跳转类型" prop="jumpType">
        <el-select clearable style="width: 100%" v-model="form.jumpType" placeholder="请选择">
          <el-option
            v-for="item in jumpTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value" :disabled="item.value == 3">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="跳转页面" prop="dataJson" v-if="form.jumpType == 2">
        <el-select clearable style="width: 100%" v-model="pageSelected" placeholder="请选择" @change="handlePageSelected">
          <el-option
            v-for="item in pageOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="跳转笔记" prop="note" v-if="form.jumpType == 2 && pageSelected == 0">
        <el-select :key="noteSelectOptionUpdate" clearable filterable style="width: 100%" v-model="noteSelected" placeholder="请选择">
          <el-option
            v-for="item in notes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作" v-if="pageSelected == 0">
        <el-button type="primary" @click="getNoteList('')">获取所有笔记</el-button>
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
import Menu from 'models/menu'

export default {
  components: {shTable},
  data() {
    return {
      table: {
        search: {
          name: '',
          parentId: '',
          level: '',
          type: '',
          jumpType: ''
        },
        remote: '/menu/page',
        update: 0
      },
      optionsKey: 0,
      cascaderSearchSelected: [],
      dialogCascaderSelected: [0],
      dialogFormVisible: false,
      dialogTitle: '',
      form: new Menu(),
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '请选择所属菜单', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择菜单类型', trigger: 'blur' }
        ],
        jumpType: [
          { required: true, message: '请选择菜单跳转类型', trigger: 'blur' }
        ],
        dataJson: [
          { required: true, message: '请选择选择页面', trigger: 'blur' }
        ],
        note: [
          { required: true, message: '请选择选择笔记', trigger: 'blur' }
        ],
      },
      typeOptions: [
        {label: '管理后台', value: 1},
        {label: '小程序', value: 2},
      ],
      jumpTypeOptions: [],
      pageSelected: null,
      pageOptions: [
        {label: '笔记', value: 0},
        {label: '笔记列表', value: 1},
        {label: '原版工具卡', value: 2},
      ],
      pages: [
        {label: "page", value: "/note/index", noteId: ''},
        {label: "page", value: "/notes/index"},
        {label: "page", value: "/menu_icon/index"},
      ],
      cascaderKey: 0,
      props: {
        checkStrictly: true,
        lazy: true,
        lazyLoad (node, resolve) {
          const { value, label, level } = node;
          // console.log('value', value, 'label', label, 'level', level);
          if (level === 0) {
            request.get('/menu/option/list?parentId=0&level=0').then(res => {
              res.unshift({
                value: 0,
                label: '首页菜单',
                leaf: true,
                hasChildren: false, selected: false, children: []
              })
              resolve(res)
              // this.optionsKey ++
            })
          }
          else {
            request.get(`/menu/option/list?parentId=${value}`).then(res => {
              // console.log('children', !res, res);
              resolve(res)
            })
          }
        }
      },
      notes: [],
      noteSelectOptionUpdate: 0,
      noteSelected: ''
    }
  },
  mounted() {
    this.getJumpTypeOptionList()
    // console.log(this.$utils.format(new Date(), 'yyyy-MM-dd'));
    // this.getNoteList ('')
  },
  methods: {
    getNoteList (menuId) {
      request.get('/note/list?menuId=' + menuId).then(res => {
        // 过滤有parentId，这里只能选择 主笔记
        res = res.filter(v => !v.parentId)
        const ns = res.map(v => ({
            label: v.title,
            value: v.id
        }))
        this.notes = ns
        this.noteSelectOptionUpdate++
        // console.log(this.notes);
      })
    },
    handlePageSelected (e) {
      if (e === 0) {
        this.getNoteList(this.form.id)
      }
      // console.log(e);
      // console.log(this.pages[e]);
    },
    getJumpTypeOptionList () {
      request.get('/menu/jumpType/option/list').then(res => {
        if (res) {
          this.jumpTypeOptions = res
        }
      });
    },
    handleCascaderSearchChange (node) {
      this.table.search.parentId = this.cascaderSearchSelected ? this.cascaderSearchSelected[this.cascaderSearchSelected.length - 1] : ''
      // console.log(node);
    },
    handleDialogCascaderChange (node) {
      // console.log(this.dialogCascaderSelected.join(','));
    },
    getList () {
      this.table.update++
    },
    submitForm(formName) {
      this.form.parentId = this.dialogCascaderSelected ? this.dialogCascaderSelected[this.dialogCascaderSelected.length - 1] : ''
      // console.log(this.form.parentId, this.form.id);
      if (this.form.parentId === this.form.id) {
        this.$message.error('菜单不能属于自己');
        return;
      }
      this.form.parentPath = this.dialogCascaderSelected.join(',')
      var dataJson = this.pages[this.pageSelected]
      // 如果是 笔记&选择笔记，dataJson中放入笔记id
      if (this.pageSelected === 0 && this.noteSelected) {
        dataJson.noteId = this.noteSelected
      }
      if (this.form.jumpType === 1) {// 如果跳菜单，清空dataJSON
        dataJson = {}
      }

      // console.log('dataJson', dataJson);
      this.form.dataJson = dataJson

      this.$refs[formName].validate((valid) => {
        if (valid) {
          var url = '/menu/insert'
          if (this.form.id) {
            url = '/menu/update'
          }
          request.post(url, this.form).then(res => {
            console.log(res);
            this.$message({
              type: 'success',
              message: '操作成功！',
            })
            this.dialogFormVisible = false
            this.getList()
            this.cascaderKey++
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleInsertClick(){
      this.dialogFormVisible = true
      this.dialogTitle = '新增'
      this.form = new Menu()
    },
    handleEdit (index, row) {
      this.dialogFormVisible = true
      this.dialogTitle = '编辑'
      if (row.parentPath) {
        this.dialogCascaderSelected = row.parentPath.split(',').map(Number)
      }
      // console.log(row);
      this.pages.forEach((v, k) => {
        if (v.value === row.dataJson.value) {
          // console.log(v.value, row.dataJson, k);
          this.pageSelected = k
          if (k === 0) {// 笔记，获取笔记id，列表
            this.getNoteList ('')
            this.noteSelected = row.dataJson.noteId
          }
        }
        // if (this.$utils.isEqual(v, row.dataJson)) {
        //   this.pageSelected = k
        // }
      });
      // console.log(this.pages.indexOf(row.dataJson));
      // this.pageSelected = this.pages.indexOf(row.dataJson)
      this.form = clone(row)
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
