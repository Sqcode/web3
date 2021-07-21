<template>
    <el-menu
        default-active="2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        router
    >
        <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <template #title>Home</template>
        </el-menu-item>
        <el-menu-item index="/about">
            <i class="el-icon-document"></i>
            <template #title>About</template>
        </el-menu-item>
        <el-menu-item index="/goods">
            <i class="el-icon-setting"></i>
            <template #title>Goods</template>
        </el-menu-item>
        <!-- <el-menu-item index="1">处理中心</el-menu-item>
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
        <el-menu-item index="4"
            ><a href="" target="_blank"
                >订单管理</a
            ></el-menu-item
        > -->
    </el-menu>
</template>

<script>
export default {
  name: 'HeaderMenu',
  components: {},
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
