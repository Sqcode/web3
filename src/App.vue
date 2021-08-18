<template>
  <el-container>
    <router-view />
    <div class="icp-group">
      <div class="icp">
        <span>su1888.cn版权所有&nbsp;©2021</span>
        <!-- <a rel="noreferrer" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=">
          <img src="//l.bst.126.net/rsc/img/icon-police.png" alt="">
          <span>无</span>
        </a> -->
        <a rel="noreferrer" target="_blank" href="https://beian.miit.gov.cn/" style=""><span>浙ICP备16007140号-1</span></a>
      </div>
    </div>
  </el-container>
</template>
<script>
  export default {
    name: 'App'
  }
</script>
<style lang="scss" scoped>
  .icp-group {
    position: absolute;
    padding: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 45px;
    overflow: hidden;
    padding: 10px 0 0;
    background: linear-gradient(180deg
      , rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
  }
  .icp {
    box-sizing: border-box;
    width: 900px;
    margin: 10px auto;
    padding: 0 34px;
    text-align: center;
  }
  .icp span {
    display: inline-block;
    vertical-align: middle;
    margin: 0px 10px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
  }
  .icp a {
    display: inline-block;
    vertical-align: middle;
    margin: 0px 10px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);text-decoration: none;
  }
  .icp img {
    display: inline-block;
    vertical-align: middle;
    margin: 0px 4px;
  }
</style>
