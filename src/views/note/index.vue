<template>
  <el-form :model="note" :rules="rules" ref="note" label-width="100px" class="demo-ruleForm">
    <el-form-item label="标题" prop="title">
      <el-input v-model="note.title"></el-input>
    </el-form-item>
    <el-form-item label="子标题" prop="subTitle">
      <el-input v-model="note.subTitle"></el-input>
    </el-form-item>
    <!-- <el-form-item label="status" prop="status">
      <el-radio-group v-model="note.status">
        <el-radio label="0"></el-radio>
        <el-radio label="1"></el-radio>
      </el-radio-group>
    </el-form-item> -->
    <el-form-item label="内容" prop="content">
      <div id="editor"></div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('note')">提交</el-button>
      <el-button @click="resetForm('note')">重置</el-button>
    </el-form-item>
  </el-form>
  <el-button @click="handleButtonClick">按钮</el-button>
</template>
<script>
// require styles
import E from 'wangeditor'
import Note from 'models/note'
import Request from 'utils/request';

export default {
    components: {
    },
    data() {
      return {
        editor: null,
        note: new Note(),
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
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.note.content = this.editor.txt.html()
            // console.log(this.note);
            return Request.post('/note/insert', this.note).then(res => {
              console.log(res);
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
      //var note = this.note
      // 配置触发 onchange 的时间频率，默认为 200ms
      // editor.config.onchangeTimeout = 500; // 修改为 500ms

      // editor.config.onchange  = function (newHtml) {
      //   note.content = editor.txt.html()
      //   console.log('onchange ', newHtml) // 获取最新的 html 内容
      // }
      editor.create()
      this.editor = editor
    }
  }
</script>
<style lang="scss" scoped>
  #editor {
    margin-top: 20px;
  }
  // .tab {
  //   margin: 20px 50px;
  //   height: calc(100% - 40px);
  // }

  // .div-flex {
  //   display: flex;
  //   flex-direction: column;
  //   height: 100%;
  // }
</style>
