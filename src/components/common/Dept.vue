<template>
  <el-cascader style="width: 100%"
    clearable
    filterable
    :props="props"
    v-model="cascaderSelected"
    @change="handleCascaderChange">
  </el-cascader>
</template>
<script>
import request from '@/utils/request'

export default {
  props: {
    defaultSelected: {
      type: Array,
      required: false
    }
  },
  setup(props) {
    var cascaderSelected = props.defaultSelected
    return {
      cascaderSelected
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
      props: {
        expandTrigger: 'hover',
        checkStrictly: true,
        lazy: true,
        lazyLoad (node, resolve) {
          const { value, label, level } = node
          if (level === 0) {
            request.get('/dept/option/list?parentId=0').then(res => {
              resolve(res)
            })
          } else {
            request.get(`/dept/option/list?parentId=${value}`).then(res => {
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
    // console.log(this.cascaderSelected);
  },
  methods: {
    handleCascaderChange (node) {
      this.selected = this.cascaderSelected ? this.cascaderSelected[this.cascaderSelected.length - 1] : ''
      this.$emit('selected', this.cascaderSelected)
    }
  }
}
</script>
