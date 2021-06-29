<template>
    <el-container>
        <el-header><HeaderMenu></HeaderMenu></el-header>
        <el-container>
            <el-aside width="240px">
              <Menu></Menu>
            </el-aside>
            <el-container>
                <el-main>
                    <div id="nav">
                        <router-link to="/home">Home</router-link>
                        | <router-link to="/about">About</router-link> |
                        <router-link to="/goods">Goods</router-link>
                    </div>
                    <router-view />
                </el-main>
                <!-- <el-footer>Footer</el-footer> -->
            </el-container>
        </el-container>
    </el-container>
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
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
