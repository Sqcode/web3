<template>
  <el-select @change="handleSelectChange" @clear="handleClear" clearable filterable style="width: 100%" v-model="selected" placeholder="请选择">
    <el-option
      v-for="item in notes"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
import request from '@/utils/request'

export default {
  props: {
    defaultSelected: {
      type: Number,
      required: false
    }
  },
  setup(props) {
    var selected = props.defaultSelected
    return {
      selected
    };
  },
  emits: ['selected'],
  components: {
  },
  created () {
  },
  data () {
    return {
      selected: '',
      notes: []
    }
  },
  computed: {
  },
  mounted () {
    // 加载所有笔记
    this.getNoteList('')
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
      })
    },
    handleSelectChange (value) {
      this.$emit('selected', value)
    },
    handleClear() {
      this.$emit('clear')
    }
  }
}
</script>
