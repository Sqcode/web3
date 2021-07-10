<template>
  <el-form :model="form" :rules="rules" ref="form" label-width="100px" >
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="子标题" prop="subTitle">
      <el-input v-model="form.subTitle"></el-input>
    </el-form-item>
    <el-form-item label="所属菜单" prop="subTitle">
      <el-select style="width: 100%" v-model="form.menuId" placeholder="请选择">
        <el-option
          v-for="item in menus"
          :key="item.value"
          :label="item.label"
          :value="item.value">
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
      <div id="editor"></div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">提交</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>
  <!-- <el-button @click="handleButtonClick">按钮</el-button> -->
</template>
<script>
// require styles
import E from 'wangeditor'
import Note from 'models/note'
import Request from 'utils/request';

export default {
  props: {
    note: {
      type: Object,
      required: true
    },
  },
  emits: ['getList'],
  components: {
  },
  data() {
    return {
      editor: null,
      form: this.note,
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: 'status', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写内容', trigger: 'blur' }
        ],
        menus: []
      }
    }
  },
  methods: {
    handleOpen(o) {
      this.form = o
      this.editor.txt.html(o.content);
      // console.log('handleOpen', o);
    },
    submitForm(formName) {
      this.form.content = this.editor.txt.html()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var url = '/note/insert'
          if (this.form.id) {
            url = '/note/update'
          }
          return Request.post(url, this.form).then(res => {
            this.$emit('getList');
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleButtonClick () {
      console.log(this.editor.txt.html());
    }
  },
  computed: {
  },
  mounted() {
    const editor = new E("#editor")
    editor.create()
    this.editor = editor

    Request.get('/menu/list?parentId=&level=2').then(res => {
      var list = []

      res.forEach(menu => {
        var obj = {}
        obj.value = menu.id
        obj.label = menu.name
        list.push(obj)
      });

      this.menus = list
      console.log(list);
    })
    // console.log('dialog', this.form.content);

    //var note = this.note
    // 配置触发 onchange 的时间频率，默认为 200ms
    // editor.config.onchangeTimeout = 500; // 修改为 500ms

    // editor.config.onchange  = function (newHtml) {
    //   note.content = editor.txt.html()
    //   console.log('onchange ', newHtml) // 获取最新的 html 内容
    // }

    // editor.txt.html(this.note.content);

    // editor.txt.html(this.note.content);

  }
}
</script>
<style lang="scss" scoped>
  #editor {
    margin-top: 20px;
  }
</style>
