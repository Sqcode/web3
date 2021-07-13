<template>
  <el-menu :default-active="this.$route.path" class="el-menu-vertical-demo" @open="handleOpen"
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
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  },
  data() {
    return {
      navList: [
        {
          name: 'About',
          route: '/about'
        },
        {
          name: 'Menu',
          route: '/menu'
        },
        {
          name: 'Note',
          route: '/note'
        },
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
