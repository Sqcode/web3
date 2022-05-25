<template>
  <div class="welcome">
    <div>
      <p style="font-size: 2em;">欢 迎 您... {{ $store.state.user ? $store.state.user.userName : '?' }}</p>
    </div>
    <div class="update">

      <p>05/25/2022 更新内容</p>
      <ol>
        <li>修复：加密显示错误的状态，附件显示错误的状态</li>
        <li>修复：最外层菜单加密下，次级菜单也支持修改加密状态</li>
      </ol>
      <div style='color: red; margin-top: 20px;'>
        <el-divider>以下历史</el-divider>
        <!-- <p>关于图片：如果有绝对路径的优先展示，其次展示oss服务图片。</p>
        <p>1. 之前填写的绝对路径的图片不受影响</p>
        <p>2. 如若使用图片上传功能，请删除绝对路径内容。否则还是会显示原先的图片</p> -->
      </div>
      <p>02/14/2022 更新内容</p>
      <ol>
        <li>调整：将操作权限、访问权限分离</li>
        <li>新增：访问权限 超级管理 > 管理 > 员工 > 普通</li>
      </ol>
      <p>12/02/2021 更新内容</p>
      <ol>
        <li>新增：菜单、笔记中更细的搜索条件</li>
        <li>优化：条件缓存，代码优化</li>
      </ol>
      <p>08/19 更新内容</p>
      <ol>
        <li>新增：角色关联、员工号，导入关联</li>
        <li>优化：代码内部优化，复用。原正常的，可能有未知bug</li>
        <li>优化：缓存通讯录中的搜索条件值，其他页面待优化（即跳页面后，返回保留搜索条件）</li>
        <li>修复？：笔记无法重新上传的问题，无法重现</li>
      </ol>
      <p>08/09 更新内容</p>
      <ol>
        <li>修复已知bug</li>
      </ol>
      <p>08/07 更新内容</p>
      <ol>
        <li>新增：加密菜单的添加，超级管理员、管理员后、访问加密</li>
        <li>新增：笔记数据后台加密，超级管理员、访问加密权限、可查看解密内容</li>
      </ol>

      <p>07/30 更新内容</p>
      <ol>
        <li>新增：资源图片可以跳转外部链接</li>
        <li>修复：笔记保存后，数据丢失问题</li>
        <li>修复：登录失效后，还能继续访问问题</li>
      </ol>
      <p>07/28 更新内容</p>
      <ol>
        <li>新增：资源、用户、笔记内的图片上传</li>
      </ol>
      <p>07/27 更新内容</p>
      <ol>
        <li>新增：管理员，菜单的图片上传</li>
        <li>修复：一些问题</li>
      </ol>
      <p>07/24 更新内容</p>
      <ol>
        <li>修复：笔记编辑中，菜单没有重新渲染的问题</li>
        <li>新增：部门、菜单、笔记，添加状态设置。禁用后小程序不展示</li>
        <li>新增：用户排序</li>
        <li>调整：未登录直接访问welcome，不能访问。"关于"页后续再调整</li>
        <li>调整：其他</li>
      </ol>
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
