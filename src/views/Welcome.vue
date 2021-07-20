<template>
  <div class="">
    <p style="font-size: 2em;">欢 迎 您... {{ $store.state.user ? $store.state.user.userName : '?' }}</p>
    <div style="font-size: 1em; text-align: left; margin-left: 100px;">
      <p>07/20 更新内容</p>
      <ol>
        <li>新增 用户</li>
        <li>新增 部门</li>
        <li>修复 已知bug</li>
      </ol>
      <el-divider>以下历史</el-divider>
      <p>07/19 更新内容</p>
      <ol>
        <li>修复 已选中笔记的错误提示</li>
        <li>修复 资源图片的排序</li>
      </ol>
    </div>
  </div>
</template>
