<template>
  <div id="note-edit-form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" >
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <!-- <el-form-item label="子标题" prop="subTitle">
        <el-input v-model="form.subTitle"></el-input>
      </el-form-item> -->
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否加密" prop="encrypt">
        <el-radio-group v-model="form.encrypt">
          <el-radio :label="1">加密</el-radio>
          <el-radio :label="0">正常</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number style="width: 100%" type="number" v-model.number="form.sort" :min="1" label="排序"></el-input-number>
      </el-form-item>
      <el-form-item label="所属菜单" prop="" v-if="!form.parentId">
        <el-cascader style="width: 100%"
          clearable
          filterable
          :props="props"
          v-model="cascaderSelected"
          @change="handleCascaderChange">
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
      <el-form-item label="内容" prop="content">
        <TEditor ref="editor" v-model="content" />
      </el-form-item>
    </el-form>
  </div>
  <el-footer>
    <el-button type="warning" @click="$goBack">返 回</el-button>
    <el-button type="primary" @click="submitForm('form')">提 交</el-button>
    <el-button @click="handleButtonClick">打印内容</el-button>
  </el-footer>

</template>
<script>
import TEditor from '@/components/TEditor.vue'
import Note from 'models/note'
import request from '@/utils/request'

export default {
  props: {
  },
  components: {
    TEditor
  },
  data () {
    return {
      content: '',
      form: new Note(),
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
      cascaderSelected: [],
      props: {
        expandTrigger: 'hover',
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
    // console.log('我是子路由页面,params:id', this.$route.params.id);
    var id = this.$route.params.id

    if (id != 0) {
      request.get('/note/' + id).then(data => {
        // console.log('note', data);
        if (data) {
          data.parentId ? data.parentId + '' : ''
          this.form = data
          setTimeout(() => {
            tinyMCE.activeEditor.setContent(data.content)
          }, 500)
        }
        if (data.parentPath) {
          this.cascaderSelected = data.parentPath.split(',').map(Number)
        }
      })

    }

    this.getNoteList('')// 加载所有笔记
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
    handleCascaderChange (node) {
      // console.log(this.cascaderSelected.join(','));
      this.getNoteList(node[node.length - 1])
    },
    submitForm (formName) {
      this.form.content = tinyMCE.activeEditor.getContent()
      this.form.menuId = this.cascaderSelected ? this.cascaderSelected[this.cascaderSelected.length - 1] : ''
      if (this.form.parentId) {
        // 属于某个笔记的话，清空菜单
        this.form.menuId = ''
      }
      // console.log(this.form);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var url = '/note/insert'
          if (this.form.id) {
            url = '/note/update'
          }
          request.post(url, this.form).then(res => {
            this.$message({
              type: 'success',
              message: '操作成功！'
            })
            this.$goBack()
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
  #note-edit-form {
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    overflow-y: scroll;
  }
</style>
