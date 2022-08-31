<template>
  <nav>
    <div class="nav-wrapper blue darken-3">
      <router-link to="/" class="brand-logo">Tasks manager</router-link>
      <ul class="right hide-on-med-and-down">
        <router-link tag="li" to="/" exact active-class="active">
          <a href="#">Create</a>
        </router-link>
        <router-link tag="li" to="/list" exact active-class="active">
          <a href="#">List</a>
        </router-link>
<!--        <router-link tag="li" to="/task:id" exact active-class="active">-->
<!--          <a href="#">Task</a>-->
<!--        </router-link>-->
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navbar"
}
</script>

<style scoped>
.nav-wrapper {
  padding: 0 15em;
}
</style>