<template>
  <!-- <el-dialog :title="dialogTitle" v-model="dialogFormVisible" :close-on-click-modal="false" fullscreen> -->
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" >
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <!-- <el-form-item label="子标题" prop="subTitle">
        <el-input v-model="form.subTitle"></el-input>
      </el-form-item> -->
      <el-form-item label="排序">
        <el-input-number style="width: 100%" type="number" v-model.number="form.sort" :min="1" label="排序"></el-input-number>
      </el-form-item>
      <el-form-item label="所属菜单" prop="" v-if="!form.parentId">
        <el-cascader style="width: 100%"
          clearable
          filterable
          :props="props"
          v-model="dialogCascaderSelected"
          @change="handleDialogCascaderChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="所属笔记" prop="">
        <el-select clearable filterable style="width: 100%" v-model="form.parentId" placeholder="请选择">
          <el-option
            v-for="item in notes"
            :key="item.value"
            :label="item.label"
            :value="item.value" :disabled="item.value == form.id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="status" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio label="0"></el-radio>
          <el-radio label="1"></el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="内容" prop="content">
        <!-- <div id="editor"></div> -->
        <TEditor ref="editor" v-model="content" />
      </el-form-item>
      <el-form-item>
        <!-- <el-button >取 消</el-button> -->
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <!-- <el-button @click="resetForm('form')">重置</el-button> -->
      </el-form-item>
    </el-form>
  <!-- </dialog> -->
  <el-button @click="handleButtonClick">按钮</el-button>
</template>
<script>
// require styles
// import E from 'wangeditor'
import TEditor from '@/components/TEditor.vue'
import Note from 'models/note'
import request from '@/utils/request'
// import Request from 'utils/request';

export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  emits: ['getList'],
  components: {
    TEditor
  },
  data () {
    return {
      content: '',
      form: this.note,
      // dialogFormVisible: false,
      // dialogTitle: '',
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        // menuId: [
        //   { required: true, message: '请选择菜单', trigger: 'blur' }
        // ],
        content: [
          { required: true, message: '请填写内容', trigger: 'blur' }
        ]
      },
      notes: [],
      dialogCascaderSelected: [],
      props: {
        checkStrictly: true,
        lazy: true,
        lazyLoad (node, resolve) {
          const { value, label, level } = node
          if (level === 0) {
            request.get('/menu/option/list?parentId=0&level=0').then(res => {
              resolve(res)
            })
          } else {
            request.get(`/menu/option/list?parentId=${value}`).then(res => {
              resolve(res)
            })
          }
        }
      }
    }
  },
  computed: {
  },
  mounted () {
    // const editor = new E("#editor")
    // editor.create()
    // this.editor = editor
    // var note = this.note
    // 配置触发 onchange 的时间频率，默认为 200ms
    // editor.config.onchangeTimeout = 500; // 修改为 500ms
    // editor.config.onchange  = function (newHtml) {
    //   note.content = editor.txt.html()
    //   console.log('onchange ', newHtml) // 获取最新的 html 内容
    // }
    // editor.txt.html(this.note.content);
    // editor.txt.html(this.note.content);
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
        // console.log(this.notes);
      })
    },
    handleDialogCascaderChange (node) {
      // console.log(this.dialogCascaderSelected.join(','));
      this.getNoteList(node[node.length - 1])
    },
    handleOpen (row) {
      this.form = row
      // console.log('handleOpen', row);
      // this.editor.txt.html(row.content);
      // console.log(row.parentPath);
      if (row.parentPath) {
        this.dialogCascaderSelected = row.parentPath.split(',').map(Number)
      }
      this.getNoteList('')
    },
    submitForm (formName) {
      // this.form.content = this.editor.txt.html()
      this.form.menuId = this.dialogCascaderSelected ? this.dialogCascaderSelected[this.dialogCascaderSelected.length - 1] : ''
      // console.log(this.form);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var url = '/note/insert'
          if (this.form.id) {
            url = '/note/update'
          }

          request.post(url, this.form).then(res => {
            this.$emit('getList')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    handleButtonClick () {
      console.log(tinyMCE.activeEditor.getContent())
    }
  }
}
</script>
<style lang="scss" scoped>
  #editor {
    margin-top: 20px;
  }
</style>
