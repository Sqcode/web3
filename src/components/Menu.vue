<template>
  <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
    <el-radio-button :label="false" v-if="isCollapse">展开</el-radio-button>
    <el-radio-button :label="true" v-if="!isCollapse">收起</el-radio-button>
  </el-radio-group> -->
  <!-- <el-tooltip :content="'Switch value: ' + isCollapse" placement="top">
    <el-switch
      v-model="isCollapse"
      active-color="#13ce66"
      inactive-color="#ff4949"
      :active-value="true"
      :inactive-value="false"
    >
    </el-switch>
  </el-tooltip> -->
  <el-menu :collapse="isCollapse" :default-active="routerPath" class="el-menu-vertical-demo" @open="handleOpen"
    @close="handleClose" router
    background-color="white"
    text-color="black"
    active-text-color="blue">
    <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.route">
      <template #title>{{ item.name }}</template>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'Menu',
  components: {},
  mounted () {
  },
  computed: {
    routerPath: function () {
      // 匹配第一个/ 的路径
      var path = this.$route.path
      var index = path.indexOf('/')
      var index_2 = path.indexOf('/', index + 1)
      if (index_2 != -1) {
        return path.substring(0, index_2)
      } else {
        return path
      }
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  data () {
    return {
      isCollapse: false,
      navList: [
        {
          name: '欢迎页',
          route: '/welcome'
        },
        {
          name: '管理员',
          route: '/sys_user'
        },
        {
          name: '部门',
          route: '/dept'
        },
        {
          name: '角色',
          route: '/role'
        },
        {
          name: '通讯录',
          route: '/user'
        },
        {
          name: '微信用户',
          route: '/userProfile'
        },
        {
          name: '菜单',
          route: '/menu'
        },
        {
          name: '笔记',
          route: '/note'
        },
        {
          name: '资源',
          route: '/resource'
        },
        {
          name: '关于',
          route: '/about'
        }
        // { name: 'Goods', route: '/goods' },
        // { name: 'Goods', route: '/goods' },
      ]
    }
  }
}
</script>
<style lang="scss">
.el-menu {
  height: 100%;
}
</style>
