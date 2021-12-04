<template>
  <el-container>
    <el-header>
      <HeaderMenu></HeaderMenu>
      <div class="info" v-if="$store.state.user">
        <el-dropdown @command="handleCommand">
          <div style="height: 100%;">
            <img style="height: 100%;border-radius:50%;" alt="avatar_url"
              :src=" user ? user.avatarUrl ? domain + user.avatarUrl : require('../assets/logo.png') : require('../assets/logo.png')" />
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
        <HeaderDropdownPwd ref="dropDownDialog" :show="dialog" />
      </div>
      <div class="info" v-else @click="function(){$router.push({ name: 'login' })}">登 录</div>
    </el-header>
    <el-main>
      <el-button @click="function(){$message({
      type: 'success',
      message: 'success'
    })}">按钮</el-button>
      <el-button type="primary" @click="function(e){
        $message({
          type: 'success',
          message: e
        })}">按钮</el-button>
      <el-button type="success" @click='$alert(e)'>按钮</el-button>
      <el-button type="info">按钮</el-button>
      <el-button type="warning">按钮</el-button>
      <el-button type="danger">按钮</el-button>
      <router-view />
    </el-main>
  </el-container>
</template>
<script>
import HeaderMenu from '@/components/HeaderMenu.vue'
import HeaderDropdownPwd from '@/components/HeaderDropdownPwd.vue'
import request from '@/utils/request'

export default {
  name: 'Home',
  components: {
    HeaderMenu,
    HeaderDropdownPwd
  },
  created () {
    this.domain = process.env.VUE_APP_DOMAIN_URL
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
          console.log(this.$store.state.token);
          this.$store.commit('REMOVE_INFO', this.$store.state)
          this.$router.push({ name: 'login' })
        // })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .info {
    display: flex;
    flex-flow: row;
    flex-direction: row;
    font-size: 12px;
    background-color: rgb(255 255 255 / 0%);
    justify-content: flex-end;
  }
  .el-header {
    position: relative;
    display: flex;
  }
</style>
<style lang="scss" >
  #app {
    // background: url("../assets/images/2.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
</style>
