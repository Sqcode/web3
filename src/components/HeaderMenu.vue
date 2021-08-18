<template>
  <!-- <el-menu
    :default-active="2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-submenu index="2">
      <template #title>我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template #title>选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
  </el-menu> -->
  <el-menu class="menu" :default-active="routerPath" router mode="horizontal"
    @select="handleSelect"
    background-color="rgb(255 255 255 / 0%)"
    text-color="white"
    active-text-color="yellow">
      <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.route" :disabled="item.disable">
        <i :class="item.icon"></i>
        <template #title>{{ item.name }} </template>
        <!-- <el-submenu index="2">
          <template #title></template>
          <el-menu-item index="2-1"></el-menu-item>
        </el-submenu> -->
      </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'HeaderMenu',
  components: {},
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
  data () {
    return {
      isCollapse: false,
      navList: [
        {name: '首页', route: '/welcome', icon: 'el-icon-s-home'},
        {name: '商品', route: '/goods', icon: 'el-icon-goods', disable: true},
        {name: '关于我们', route: '/about', icon: 'el-icon-info'}
      ]
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="scss" scoped>
  .menu {
    height: 100%;
    width: 100%;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none !important;
  }
  .el-menu-item:hover {
    // background-color: rgb(245 108 108 / 0%) !important;
    background-color: rgb(245 108 108 / 40%) !important;
  }
</style>
