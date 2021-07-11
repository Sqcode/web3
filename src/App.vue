<template>
    <el-container>
        <!-- <el-header>
          <HeaderMenu></HeaderMenu>
        </el-header> -->
        <el-aside width="240px">
          <Menu></Menu>
        </el-aside>
        <el-container>
          <el-header style="text-align: right; font-size: 12px; background-color: white;">
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>查看</el-dropdown-item>
                    <el-dropdown-item>新增</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>王小虎</span>
          </el-header>
            <!-- <el-container> -->
          <!-- <el-main style="margin-top: 15px;"> -->
              <!-- <div id="nav">
                  <router-link to="/home">Home</router-link>
                  | <router-link to="/about">About</router-link> |
                  <router-link to="/goods">Goods</router-link>
              </div> -->
              <router-view />
          <!-- </el-main> -->
                <!-- <el-footer>Footer</el-footer> -->
            <!-- </el-container> -->
        </el-container>
    </el-container>
</template>

<style lang="scss">
//  .el-main {
//   height: 100%;
// }


// #nav {
//     padding: 30px;

//     a {
//         font-weight: bold;
//         color: #2c3e50;

//         &.router-link-exact-active {
//             color: #42b983;
//         }
//     }
// }
</style>
<script>
// @ is an alias to /src
import Menu from '@/components/Menu.vue'
import HeaderMenu from '@/components/HeaderMenu.vue'

export default {
  name: 'App',
  components: {
    Menu,
    HeaderMenu
  }
}
</script>
