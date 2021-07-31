<template>
  <el-container>
    <el-aside style="width: 15%; overflow: hidden;">
      <Menu></Menu>
    </el-aside>
    <el-container style="width: 80%">
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
      <!-- <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
          v-for="(item, index) in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
        </el-tab-pane>
      </el-tabs> -->
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
  .el-header {
    display: flex;
    flex-flow: row;
    flex-direction: row;
    font-size: 12px;
    background-color: white;
    justify-content: flex-end;
  }
</style>
