<template>
  <div class="">
      <h1>欢 迎 你... {{ $store.state.user ? $store.state.user.userName : '?' }}</h1>
  </div>
</template>
