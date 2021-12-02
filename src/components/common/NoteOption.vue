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
