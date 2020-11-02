<template>
  <nav class="navbar navbar-default navbar-static-top">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/">Sports Teams & Players</a>
      </div>
      <div class="collapse navbar-collapse navbar-right" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav ">

          <template v-if="!loggedUser">
            <li>
              <router-link to="/login">Sign In</router-link>
            </li>
            <li>
              <router-link to="/register">Register</router-link>
            </li>
          </template>
          <template v-else>
            <li>
              <router-link to="/teams">Teams</router-link>
            </li>
            <li>
              <router-link to="/players">Players</router-link>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                 aria-haspopup="true" aria-expanded="false"> {{loggedUser.name}} <span
                  class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#!" @click.prevent="logout">Logout</a></li>
              </ul>
            </li>
          </template>

        </ul>
      </div>
    </div>
  </nav>

</template>

<script>
export default {
  name: 'app-header',
  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.push('/login');
    }
  },
  computed: {
    loggedUser() {
      return this.$store.getters.getLoggedUser
    }
  }
}
</script>