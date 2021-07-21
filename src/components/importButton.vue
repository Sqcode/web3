<template>
  <div class="import-excel">
    <el-dropdown split-button :type="type" :size="size" trigger="click" @command="handCommand" @click="toImportFile">
      <i v-if="loading" class="el-icon-loading"></i>
      {{text}}
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="load" :disabled="templateLoading">
            <i v-if="templateLoading" class="el-icon-loading"></i>
            {{loadText}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <input v-if="!loading" class="import-excel-input" ref="importInput" type="file" :accept="fileType" @change="fileChange" />
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '导入'
    },
    loadText: {
      type: String,
      default: '下载模板'
    },
    fileType: String,
    checkMethod: Function,
    importFileMethod: {
      type: Function,
      required: false
    },
    errorMsg: {
      type: String,
      default: '请导入正确格式的文件'
    },
    size: String,
    type: String
  },

  data () {
    return {
      loading: false,
      templateLoading: false
    }
  },

  methods: {
    toImportFile () {
      if (this.loading) {
        return
      }

      if (this.$refs.importInput) {
        this.$refs.importInput.click()
      }
    },

    fileChange (e) {
      const file = e.target.files[0]
      this.loading = true
      this.checkUploadFileValid(file).then(valid => {
        if (!valid) {
          this.loading = false
          return
        }

        this.importFileMethod(file).then(() => {
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }).catch(() => {
        this.loading = false
      })
    },

    checkUploadFileValid (file) {
      const checkMethod = this.checkMethod
      if (checkMethod !== undefined) {
        if (typeof checkMethod !== 'function') {
          throw new Error('checkMethod is not a function')
        }
        return checkMethod(file)
      }

      const type = file.type
      let fileType = this.fileType
      fileType = fileType.split(',')
      if (fileType.indexOf(type) === -1) {
        this.$message.error({
          message: this.errorMsg,
          duration: 2000
        })
        return Promise.resolve(false)
      }
      return Promise.resolve(true)
    },

    handCommand (command) {
      switch (command) {
        case 'load': {
          this.toLoadTemplate()
          break
        }
      }
    },

    toLoadTemplate () {
      this.$emit('load-template', this.changeTemplateLoading)
    },

    changeTemplateLoading (loading) {
      this.templateLoading = loading
    }
  }
}
</script>

<style lang="scss" scoped>
  .import-excel {
    display: inline-block;
    position: relative;
    margin: 0 10px;
    .import-excel-input {
      position: absolute;
      left: -999px;
      top: -999px;
    }
  }
</style>
