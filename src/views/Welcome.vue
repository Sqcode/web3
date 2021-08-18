<template>
  <div class="welcome">
    <div>
      <p style="font-size: 2em;">欢 迎 您... {{ $store.state.user ? $store.state.user.userName : '?' }}</p>
    </div>
    <div class="update">
      <div style='color: red; margin-top: 20px;'>
      </div>
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
