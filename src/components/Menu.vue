<template>
  <div class="menu">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu :default-active="this.$router.path" class="el-menu-vertical-demo" @open="handleOpen"
          @close="handleClose" router>
          <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.route">
            <template #title>{{ item.name }}</template>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
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
        navList: [{
            name: 'Home',
            route: '/home'
          },
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
          { name: 'Goods', route: '/goods' },
          { name: 'Goods', route: '/goods' },
        ]
      }
    }
  }
</script>
