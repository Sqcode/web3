<template>
  <el-container>
    <el-header>
      <HeaderMenu></HeaderMenu>
      <div class="info" v-if="$store.state.user">
        <el-dropdown @command="handleCommand">
          <div style="height: 100%;">
            <img style="height: 100%;border-radius:50%;" alt="avatar_url"
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
        <HeaderDropdownPwd ref="dropDownDialog" :show="dialog" />
      </div>
      <div v-else>登录</div>
    </el-header>
    <el-main>
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
    this.prefix = process.env.VUE_APP_IMAGE_URL_PREFIX
  },
  mounted () {
    // console.log('mounted', this.$store.state.user);
  },
  data () {
    return {
      user: this.$store.state.user,
      dialog: false,
    //   editableTabsValue: '2',
    //   editableTabs: [{
    //     title: 'Tab 1',
    //     name: '1',
    //     content: 'Tab 1 content'
    //   }, {
    //     title: 'Tab 2',
    //     name: '2',
    //     content: 'Tab 2 content'
    //   }],
    //   tabIndex: 2
    }
  },
  methods: {
    addTab(targetName) {
      let newTabName = ++this.tabIndex + '';
      this.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content'
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
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
    background: url("../assets/images/2.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
</style>
