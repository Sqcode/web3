<template>
  <div class="upload">
    <input v-if="!loading" class="upload-input" ref="upload" type="file" :accept="fileType" @change="fileChange" />
  </div>
</template>

<script>
export default {
  props: {
    fileType: String,
    checkMethod: Function,
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
    }
  },

  methods: {
    toImportFile () {
      if (this.loading) {
        return
      }

      if (this.$refs.upload) {
        this.$refs.upload.click()
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
  }
}
</script>

<style lang="scss" scoped>
  .upload {
    display: inline-block;
    position: relative;
    margin: 0 10px;
    .upload-input {
      position: absolute;
      left: -999px;
      top: -999px;
    }
  }
</style>
