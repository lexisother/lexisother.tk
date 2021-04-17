<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
body {
  background-color: #181a1b;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #aec2d3;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #aec2d3;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
