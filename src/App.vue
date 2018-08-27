<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Charts</router-link> |
      <router-link to="/about">About</router-link>
      <!-- <router-link to="/chart">Chart</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './styles/settings.scss';
body {
  background-image: url('assets/leaves-pattern.png');
  background-repeat: repeat;
  color: $black;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.Chart {
  background: #292d36;
  border-radius: 15px;
  box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
  margin: 25px 0;
  color: rgb(0, 255, 0);
  min-height: 32rem;
}

.Chart h2 {
  margin-top: 0;
  padding: 15px 0;
  color: rgba(255, 255, 255, 0.87);
  border-bottom: 1px solid #323d54;
}
</style>
