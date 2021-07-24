<template>
  <div class="welcome">
    <div>
      <p style="font-size: 2em;">欢 迎 您... {{ $store.state.user ? $store.state.user.userName : '?' }}</p>
    </div>
    <div class="update">
      <p>07/24 更新内容</p>
      <ol>
        <li>修复：笔记编辑中，菜单没有重新渲染的问题</li>
        <li>新增：部门、菜单、笔记，添加状态设置。禁用后小程序不展示</li>
        <li>新增：用户排序</li>
        <li>调整：未登录直接访问welcome，不能访问。"关于"页后续再调整</li>
      </ol>
      <el-divider>以下历史</el-divider>
      <p>07/21 更新内容</p>
      <ol>
        <li>新增：导出，导入用户模板</li>
        <li>新增：导入用户</li>
      </ol>
      <p>07/20 更新内容</p>
      <ol>
        <li>新增：用户</li>
        <li>新增：部门</li>
        <li>修复：已知bug</li>
      </ol>
      <p>07/19 更新内容</p>
      <ol>
        <li>修复：已选中笔记的错误提示</li>
        <li>修复：资源图片的排序</li>
      </ol>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .welcome {
    display: flex;
    height: 80%;
    flex-direction: column;
    margin: 10px 30px;
  }
  .update {
    font-size: 1em;
    text-align: left;
    height: 100%;
    flex: 1;
    overflow-y: scroll;
  }
</style>
