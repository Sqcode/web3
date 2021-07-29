<template>
  <div id="edit-form">
    <el-form :model="form" ref="form" :rules="rules" label-width="100px">
      <el-form-item label="图标" prop="url" >
        <UploadTemplateManual v-if="form.absoluteUrl || form.url" ref="upload" :prefix="'menu/'" :url="form.url" />
        <UploadTemplateManual v-else ref="upload" :prefix="'menu/'" :url="form.url" />
      </el-form-item>
      <el-form-item label="图标地址" prop="absoluteUrl">
        <el-input v-model="form.absoluteUrl"></el-input>
        <span style="color: red;">绝对路径，可以直接访问的网络图片</span>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number style="width: 100%" type="number" v-model.number="form.sort" :min="1" label="小程序菜单排序"></el-input-number>
      </el-form-item>
      <el-form-item label="所属菜单" prop="parentId">
        <el-cascader style="width: 100%"
          clearable
          filterable
          :props="props"
          v-model="cascaderMenuSelected"
          @change="handleCascaderMenuChange"
          :key="cascaderKey"
        >
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
      <el-form-item label="跳转笔记" prop="dataJson.noteId" :rules="[{ required: true, message: '请选择笔记', trigger: 'blur' }]" v-if="form.jumpType == 2 && pageSelected == 0">
        <el-select :key="noteSelectOptionUpdate" clearable filterable style="width: 100%" v-model="noteSelected" placeholder="请选择">
          <el-option
            v-for="item in notes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-footer>
      <el-button type="warning" @click="$goBack">返 回</el-button>
      <el-button type="primary" @click="submitForm('form')">提 交</el-button>
      <el-button v-if="pageSelected == 0" @click="getNoteList('')">获取所有笔记</el-button>
    </el-footer>
  </div>
</template>
<script>
import Menu from 'models/menu'
import request from '@/utils/request'
import UploadTemplateManual from 'components/UploadTemplateManual';
import { clone } from '@/utils/util'

export default {
  props: {
  },
  components: {
    UploadTemplateManual
  },
  created () {
    var id = this.$route.params.id
    if (id != 0) {
      request.get('/menu/' + id).then(
        response => {
          // console.log(response);
          this.form = clone(response)
          if (response.parentPath) {
            this.cascaderMenuSelected = response.parentPath.split(',').map(Number)
          }
          // console.log(row);
          this.pages.forEach((v, k) => {
            if (v.value === response.dataJson.value) {
              // console.log(v.value, row.dataJson, k);
              this.pageSelected = k
              if (k === 0) { // 笔记，获取笔记id，列表
                this.getNoteList('')
                this.noteSelected = response.dataJson.noteId
              }
            }
          })
        },
        err => {
          reject(err)
        }
      )
    }

  },
  data () {
    return {
      optionsKey: 0,
      cascaderMenuSelected: [0],
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
          { required: true, message: '请选择选择跳转页面', trigger: 'blur' }
        ]
      },
      typeOptions: [
        { label: '管理后台', value: 1 },
        { label: '小程序', value: 2 }
      ],
      jumpTypeOptions: [],
      pageSelected: null,
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
      cascaderKey: 0,
      props: {
        expandTrigger: 'hover',
        checkStrictly: true,
        lazy: true,
        lazyLoad (node, resolve) {
          const { value, label, level } = node
          // console.log('value', value, 'label', label, 'level', level);
          if (level === 0) {
            request.get('/menu/option/list?parentId=0&level=0').then(res => {
              res.unshift({
                value: 0,
                label: '首页菜单',
                leaf: true,
                hasChildren: false,
                selected: false,
                children: []
              })
              resolve(res)
              // this.optionsKey ++
            })
          } else {
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
  computed: {
  },
  mounted () {
    this.getJumpTypeOptionList()
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
    getJumpTypeOptionList () {
      request.get('/menu/jumpType/option/list').then(res => {
        if (res) {
          this.jumpTypeOptions = res
        }
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
      })
    },
    handleCascaderMenuChange (node) {
      // this.table.search.parentId = this.cascaderMenuSelected ? this.cascaderMenuSelected[this.cascaderMenuSelected.length - 1] : ''
      console.log(node);
    },
    submitForm (formName) {
      this.form.parentId = this.cascaderMenuSelected ? this.cascaderMenuSelected[this.cascaderMenuSelected.length - 1] : ''
      // console.log(this.form.parentId, this.form.id);
      if (this.form.parentId === this.form.id) {
        this.$message.error('菜单不能属于自己')
        return
      }
      this.form.parentPath = this.cascaderMenuSelected ? this.cascaderMenuSelected.join(',') : ''
      var dataJson = this.pages[this.pageSelected]
      // 如果是 笔记&选择笔记，dataJson中放入笔记id
      // console.log(dataJson, this.pageSelected, this.noteSelected);
      if (this.pageSelected === 0 && this.noteSelected) {
        dataJson.noteId = this.noteSelected
      }
      if (this.form.jumpType === 1) { // 如果跳菜单，清空dataJSON
        dataJson = {}
      }
      // console.log('dataJson', dataJson);
      this.form.dataJson = dataJson
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$refs.upload.isChange) {
            console.log(this.$refs.upload.isChange);
            const response = this.$refs.upload.submit()
            response.then((imagePath) => {
              console.log(imagePath);
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
      console.log('request');
      var url = '/menu/insert'
      if (this.form.id) {
        url = '/menu/update'
      }
      request.post(url, this.form).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功！'
        })
        this.$goBack()
        this.cascaderKey++
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  #edit-form {
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    overflow: auto;
  }
</style>
