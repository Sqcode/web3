<template>
  <!-- <div class="shTable"> -->
    <sh-table :remote="table.remote" :criteria="table.search" :update="table.update">
      <!-- 搜索条件 -->
      <template #search>
        <el-form-item label="类型">
          <el-select clearable style="width: 100%" v-model="table.search.type" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
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
      <el-table-column prop="" label="图片">
        <template #default="scope">
          <el-image v-if="scope.row.absoluteUrl || scope.row.url"
            style="width: 100%; height: 100px"
            :src="scope.row.absoluteUrl ? scope.row.absoluteUrl : this.$utils.absoluteUrl(scope.row.url)"
            fit="fill" :preview-src-list="[scope.row.absoluteUrl ? scope.row.absoluteUrl : this.$utils.absoluteUrl(scope.row.url)]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="type" label="类型">
        <template #default="scope">
          <span v-for="item in typeOptions">
            <span v-if="item.value === scope.row.type">{{item.label}}</span>
          </span>
        </template>
      </el-table-column>
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
  <!-- </div> -->
  <el-dialog :title="dialogTitle" v-model="dialogFormVisible" :destroy-on-close="true">
    <el-form :model="form" ref="form" :rules="rules" label-width="100px">
      <el-form-item label="图片" prop="url" >
        <UploadTemplateManual v-if="form.absoluteUrl || form.url" ref="upload" :prefix="'resource/'" :url="form.absoluteUrl ? form.absoluteUrl : form.url" />
        <UploadTemplateManual v-else ref="upload" :prefix="'resource/'" :url="form.absoluteUrl ? form.absoluteUrl : form.url" />
      </el-form-item>
      <el-form-item label="图片地址" prop="absoluteUrl">
        <el-input v-model="form.absoluteUrl"></el-input>
        <span style="color: red;">绝对路径，可以直接访问的网络图片</span>
      </el-form-item>
      <el-form-item label="资源描述" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="资源类型" prop="type">
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
            :value="item.value" :disabled="item.value == 1 || item.value == 2">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="外链链接" v-if="form.jumpType == 3">
        <el-input placeholder="请输入完整的外链url" v-model="outUrl" clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="跳转页面" prop="dataJson" v-if="form.jumpType == 2">
        <el-select clearable style="width: 100%" v-model="pageSelected" placeholder="请选择" @change="handlePageSelected">
          <el-option
            v-for="item in pageOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="跳转笔记" prop="dataJson.noteId" :rules="[{ required: true, message: '请选择笔记', trigger: 'blur' }]" v-if="form.jumpType == 2 && pageSelected == 0">
        <el-select :key="noteSelectOptionUpdate" clearable filterable style="width: 100%" v-model="noteSelected" placeholder="请选择">
          <el-option
            v-for="item in notes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="排序">
        <el-input-number style="width: 100%" type="number" v-model.number="form.sort" :min="1" label="排序"></el-input-number>
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
import Resource from 'models/resource'
import UploadTemplateManual from 'components/UploadTemplateManual';

export default {
  name: 'Resource',
  components: { shTable, UploadTemplateManual },
  data () {
    return {
      table: {
        search: {
          name: '',
          type: '',
          parentId: ''
        },
        remote: '/resource/page',
        update: 0
      },
      dialogFormVisible: false,
      dialogTitle: '',
      form: new Resource(),
      rules: {
        name: [
          { required: true, message: '请输入资源描述名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
        // url: [
        //   { required: true, message: '请上传图片', trigger: 'blur' }
        // ],
        // absoluteUrl: [
        //   { required: true, message: '请上传图片', trigger: 'blur' }
        // ],
      },
      typeOptions: [
        { label: '首页Banner', value: 1 },
        { label: '笔记背景图', value: 2 },
        { label: '菜单Banner', value: 3 },
        { label: '笔记列表Banner', value: 4 },
        { label: '加密首页', value: 5 }
      ],
      jumpTypeOptions: [],
      pageSelected: null,
      outUrl: '',
      pageOptions: [
        { label: '笔记', value: 0 },
        { label: '笔记列表', value: 1 },
        { label: '原版工具卡', value: 2 }
      ],
      pages: [
        { label: 'page', value: '/note/index', noteId: '' },
        { label: 'page', value: '/notes/index' },
        { label: 'page', value: '/menu_icon/index' }
      ],
      notes: [],
      noteSelectOptionUpdate: 0,
      noteSelected: ''
    }
  },
  mounted () {
    this.getJumpTypeOptionList()
  },
  methods: {
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
    submitForm (formName) {
      var dataJson = this.pages[this.pageSelected]
      // 如果是 笔记&选择笔记，dataJson中放入笔记id
      // console.log(dataJson, this.pageSelected, this.noteSelected);
      if (this.pageSelected === 0 && this.noteSelected) {
        dataJson.noteId = this.noteSelected
      }
      if (this.form.jumpType === 1) { // 如果跳菜单，清空dataJSON
        dataJson = {}
      }
      if (this.form.jumpType === 3) { // 如果跳菜单，清空dataJSON
        dataJson = {
          url: this.outUrl
        }
      }
      // console.log('dataJson', dataJson);
      this.form.dataJson = dataJson

      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$refs.upload.isChange) {
            // console.log(this.$refs.upload.isChange);
            const response = this.$refs.upload.submit()
            response.then((imagePath) => {
              // console.log(imagePath);
              if (imagePath) {
                this.form.url = imagePath
              }
              this.handleSuccess()
            }).catch((err) => {
              console.log('oss 异常')
            });
          } else {
            this.handleSuccess()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSuccess () {
      // console.log('request');
      var url = '/resource/insert'
      if (this.form.id) {
        url = '/resource/update'
      }
      request.post(url, this.form).then(res => {
        this.dialogFormVisible = false
        this.getList()
      })
    },
    handleInsertClick () {
      this.dialogFormVisible = true
      this.dialogTitle = '新增'
      this.outUrl = ''
      this.form = new Resource()
    },
    handleEdit (index, row) {
      this.dialogFormVisible = true
      this.dialogTitle = '编辑'
      this.form = clone(row)
      if (row.jumpType === 3 && row.dataJson) {
        this.outUrl = row.dataJson.url
      }
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.post(`/resource/del/${row.id}`).then(res => {
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
