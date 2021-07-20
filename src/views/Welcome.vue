<template>
  <div class="">
      <p style="font-size: 3em;">欢 迎 你... {{ $store.state.user ? $store.state.user.userName : '?' }}</p>
      <div style="font-size: 1em; text-align: left; margin-left: 100px;">
          <p>07/19 更新内容</p>
          <ol>
            <li>修复 已选中笔记的错误提示</li>
            <li>修复 资源图片的排序</li>
          </ol>
      </div>
  </div>
</template>
