<template>
  <div class="">
      <h1>欢 迎 你... {{ $store.state.user ? $store.state.user.userName : '?' }}</h1>
      <div style="">
          <h2>更新内容</h2>
          <h3>1. 修复已选中笔记的错误提示</h3>
          <h3>2. 资源图片的排序</h3>
      </div>
  </div>
</template>
