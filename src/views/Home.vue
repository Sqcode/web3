<template>
  <el-container>
    <el-aside width="240px">
      <Menu></Menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-dropdown @command="handleCommand">
          <div style="height: 100%;">
            <img style="height: 100%;" alt="avatar_url"
              :src=" user ? user.avatarUrl ? prefix + user.avatarUrl : require('../assets/logo.png') : require('../assets/logo.png')" />
            <!-- <span>{{ user.userName }}</span> -->
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <!-- <el-dropdown-item>查看信息</el-dropdown-item> -->
              <el-dropdown-item command="updatePwd">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <HeaderDropdownPwd ref="dropDownDialog" :show="dialog" />
      <el-divider></el-divider>
      <router-view />
    </el-container>
  </el-container>
</template>
<script>
import Menu from '@/components/Menu.vue'
import HeaderDropdownPwd from '@/components/HeaderDropdownPwd.vue'
import request from '@/utils/request'

export default {
  name: 'Home',
  components: {
    Menu,
    HeaderDropdownPwd
  },
  created () {
    this.prefix = process.env.VUE_APP_IMAGE_URL_PREFIX
  },
  mounted () {
    // console.log('mounted', this.$store.state.user);
  },
  data () {
    return {
      user: this.$store.state.user,
      dialog: false
    }
  },
  methods: {
    handleCommand (command) {
      // console.log(command);
      if (command === 'updatePwd') {
        this.$nextTick(() => {
          this.$refs.dropDownDialog.handleOpen(true)
        })
      }
      if (command === 'logout') {
        // request.get('/manage/logout/' + this.$store.state.user.id).then(res => {
          this.$store.commit('REMOVE_INFO', this.$store.state)
          this.$router.push({ name: 'login' })
        // })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-header {
    display: flex;
    flex-flow: row;
    flex-direction: row;
    font-size: 12px;
    background-color: white;
    justify-content: flex-end;
  }
</style>
